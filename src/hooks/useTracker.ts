// hooks/useTracker.ts
import { useState, useEffect, useCallback } from 'react';
import { 
  collection, 
  query, 
  where, 
  getDocs,
  orderBy,
  addDoc,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from '../context/AuthContext';

export interface TrackerDay {
  date: string;
  count: number;
  intensity: 0 | 1 | 2 | 3 | 4;
}

export interface StudySession {
  id: string;
  userId: string;
  date: Date;
  duration: number; // in minutes
  certificateId?: string;
  technique?: 'pomodoro' | 'focused' | 'mock-exam';
  createdAt?: Date;
}

export const useTracker = (months: number = 6) => {
  const { user } = useAuth();
  const [trackerData, setTrackerData] = useState<TrackerDay[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalStudyTime, setTotalStudyTime] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [sessions, setSessions] = useState<StudySession[]>([]);

  // Calculate date range
  const getDateRange = useCallback(() => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - months);
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);
    return { startDate, endDate };
  }, [months]);

  // Generate empty data (no sessions yet)
  const generateEmptyData = useCallback((startDate: Date, endDate: Date) => {
    const data: TrackerDay[] = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      data.push({
        date: currentDate.toISOString().split('T')[0],
        count: 0,
        intensity: 0
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }

    setTrackerData(data);
    setTotalStudyTime(0);
    setCurrentStreak(0);
  }, []);

  // Calculate current streak from data
  const calculateStreak = useCallback((data: TrackerDay[]): number => {
    let streak = 0;
    const sortedData = [...data].reverse(); // Start from most recent

    for (const day of sortedData) {
      if (day.count > 0) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  }, []);

  // Process sessions into daily tracker data
  const processTrackerData = useCallback((sessions: StudySession[], startDate: Date, endDate: Date) => {
    const dailyMap = new Map<string, number>();
    let total = 0;

    // Aggregate duration by date
    sessions.forEach(session => {
      const dateStr = session.date.toISOString().split('T')[0];
      const current = dailyMap.get(dateStr) || 0;
      dailyMap.set(dateStr, current + session.duration);
      total += session.duration;
    });

    // Generate array for all dates in range
    const data: TrackerDay[] = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const dateStr = currentDate.toISOString().split('T')[0];
      const minutes = dailyMap.get(dateStr) || 0;
      
      // Calculate intensity based on minutes
      let intensity: 0 | 1 | 2 | 3 | 4 = 0;
      if (minutes > 0) {
        if (minutes < 30) intensity = 1;
        else if (minutes < 60) intensity = 2;
        else if (minutes < 90) intensity = 3;
        else intensity = 4;
      }

      data.push({
        date: dateStr,
        count: minutes,
        intensity
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }

    setTrackerData(data);
    setTotalStudyTime(total);
    setCurrentStreak(calculateStreak(data));
  }, [calculateStreak]);

  // Fetch real study sessions from Firestore
  useEffect(() => {
    const fetchStudySessions = async () => {
      if (!user) {
        setTrackerData([]);
        setSessions([]);
        setTotalStudyTime(0);
        setCurrentStreak(0);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      const { startDate, endDate } = getDateRange();

      try {
        console.log('🟡 Fetching study sessions for user:', user.id);
        
        // Query study sessions from Firestore
        const sessionsRef = collection(db, 'studySessions');
        const q = query(
          sessionsRef,
          where('userId', '==', user.id),
          where('date', '>=', startDate),
          where('date', '<=', endDate),
          orderBy('date', 'asc')
        );

        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
          console.log('🟡 No study sessions found for this period');
          setSessions([]);
          generateEmptyData(startDate, endDate);
          setIsLoading(false);
          return;
        }

        console.log(`🟢 Found ${querySnapshot.size} study sessions`);
        
        const fetchedSessions: StudySession[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          fetchedSessions.push({
            id: doc.id,
            userId: data.userId,
            date: data.date instanceof Timestamp ? data.date.toDate() : new Date(data.date),
            duration: data.duration,
            certificateId: data.certificateId,
            technique: data.technique || 'focused',
            createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate() : undefined
          });
        });

        setSessions(fetchedSessions);
        processTrackerData(fetchedSessions, startDate, endDate);
        
      } catch (err) {
        console.error('🔴 Error fetching study sessions:', err);
        setError('Failed to load study tracker data');
        generateEmptyData(startDate, endDate);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudySessions();
  }, [user, months, getDateRange, generateEmptyData, processTrackerData]);

  // Get intensity color class
  const getIntensityColor = useCallback((intensity: number): string => {
    const colors = {
      0: 'bg-gray-100',
      1: 'bg-purple-200',
      2: 'bg-purple-300',
      3: 'bg-purple-400',
      4: 'bg-purple-600'
    };
    return colors[intensity as keyof typeof colors] || colors[0];
  }, []);

  // Get contribution level for a date
  const getContributionLevel = useCallback((date: Date): number => {
    const dateStr = date.toISOString().split('T')[0];
    const day = trackerData.find(d => d.date === dateStr);
    return day?.intensity || 0;
  }, [trackerData]);

  // Get study minutes for a date
  const getMinutesForDate = useCallback((date: Date): number => {
    const dateStr = date.toISOString().split('T')[0];
    const day = trackerData.find(d => d.date === dateStr);
    return day?.count || 0;
  }, [trackerData]);

  // Add a new study session (to be called from StudyTimer)
  const addStudySession = useCallback(async (
    duration: number, 
    certificateId?: string, 
    technique?: 'pomodoro' | 'focused' | 'mock-exam'
  ) => {
    if (!user) throw new Error('No user logged in');

    try {
      console.log('🟡 Adding study session:', { duration, certificateId, technique });
      
      const sessionData = {
        userId: user.id,
        date: new Date(),
        duration,
        certificateId: certificateId || null,
        technique: technique || 'focused',
        createdAt: serverTimestamp()
      };

      const docRef = await addDoc(collection(db, 'studySessions'), sessionData);
      console.log('🟢 Study session added with ID:', docRef.id);
      
      // Add to local state
      const newSession: StudySession = {
        id: docRef.id,
        userId: user.id,
        date: new Date(),
        duration,
        certificateId,
        technique: technique || 'focused',
        createdAt: new Date()
      };

      setSessions(prev => {
        const updated = [...prev, newSession];
        // Reprocess tracker data with updated sessions
        const { startDate, endDate } = getDateRange();
        processTrackerData(updated, startDate, endDate);
        return updated;
      });
      
      return docRef.id;
    } catch (err) {
      console.error('🔴 Error adding study session:', err);
      throw err;
    }
  }, [user, getDateRange, processTrackerData]);

  // Refresh data manually
  const refresh = useCallback(async () => {
    if (!user) return;

    setIsLoading(true);
    setError(null);

    const { startDate, endDate } = getDateRange();

    try {
      const sessionsRef = collection(db, 'studySessions');
      const q = query(
        sessionsRef,
        where('userId', '==', user.id),
        where('date', '>=', startDate),
        where('date', '<=', endDate),
        orderBy('date', 'asc')
      );

      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        setSessions([]);
        generateEmptyData(startDate, endDate);
      } else {
        const fetchedSessions: StudySession[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          fetchedSessions.push({
            id: doc.id,
            userId: data.userId,
            date: data.date instanceof Timestamp ? data.date.toDate() : new Date(data.date),
            duration: data.duration,
            certificateId: data.certificateId,
            technique: data.technique || 'focused',
            createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate() : undefined
          });
        });

        setSessions(fetchedSessions);
        processTrackerData(fetchedSessions, startDate, endDate);
      }
    } catch (err) {
      console.error('🔴 Error refreshing study sessions:', err);
      setError('Failed to refresh study tracker data');
    } finally {
      setIsLoading(false);
    }
  }, [user, getDateRange, generateEmptyData, processTrackerData]);

  return {
    trackerData,
    sessions,
    isLoading,
    error,
    totalStudyTime,
    currentStreak,
    getIntensityColor,
    getContributionLevel,
    getMinutesForDate,
    addStudySession,
    refresh
  };
};