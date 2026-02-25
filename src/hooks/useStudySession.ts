// hooks/useStudySession.ts
import { useState, useEffect } from 'react';
import { StudySession } from '../types';

export const useStudySession = (certificateId?: string) => {
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [isActive, setIsActive] = useState(false);
  const [currentDuration, setCurrentDuration] = useState(0);
  const [technique, setTechnique] = useState<'pomodoro' | 'focused' | 'mock-exam'>('focused');

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive) {
      interval = setInterval(() => {
        setCurrentDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const startSession = (selectedTechnique: typeof technique) => {
    setIsActive(true);
    setTechnique(selectedTechnique);
    setCurrentDuration(0);
  };

  const pauseSession = () => setIsActive(false);
  
  const endSession = async () => {
    if (!certificateId || currentDuration === 0) return;
    
    const session: StudySession = {
        id: Date.now().toString(),
        certificateId,
        date: new Date(),
        duration: Math.floor(currentDuration / 60), // convert to minutes
        technique,
        userId: ''
    };
    
    // Save to backend
    try {
      await fetch('/api/sessions', {
        method: 'POST',
        body: JSON.stringify(session)
      });
      setSessions(prev => [session, ...prev]);
    } catch (error) {
      console.error('Failed to save session:', error);
    }
    
    setIsActive(false);
    setCurrentDuration(0);
  };

  return {
    sessions,
    isActive,
    currentDuration,
    technique,
    startSession,
    pauseSession,
    endSession
  };
};