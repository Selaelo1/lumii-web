// pages/Dashboard.tsx
import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCertificates } from '../hooks/useCertificates';
import { useStudySession } from '../hooks/useStudySession';
import { useTracker } from '../hooks/useTracker';
import { useNavigate } from 'react-router-dom';
import StreakCard from '../components/dashboard/StreakCard';
import ProgressChart from '../components/dashboard/ProgressChart';
import CertificateGrid from '../components/dashboard/CertificateGrid';
import StudyTimer from '../components/dashboard/StudyTimer';
import TrackerGrid from '../components/dashboard/TrackerGrid';
import Button from '../components/ui/Button';
import { Book, Time, Trophy, Add, Link, ArrowRight } from '@carbon/icons-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Check if profile is complete, redirect to profile setup if not
  useEffect(() => {
    if (user && !user.isProfileComplete) {
      navigate('/profile/setup');
    }
  }, [user, navigate]);

  // Only fetch data if user exists and profile is complete
  const { certificates, overallProgress, isLoading: certsLoading } = 
    useCertificates(user?.id);
  const { 
    isActive, 
    currentDuration, 
    technique, 
    startSession, 
    pauseSession, 
    endSession 
  } = useStudySession();
  const { 
    trackerData, 
    currentStreak, 
    totalStudyTime, 
    isLoading: trackerLoading 
  } = useTracker(6);

  // Show loading state while fetching data
  if (certsLoading || trackerLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Use REAL data from hooks, with proper defaults if data is empty
  const streakData = {
    currentStreak: currentStreak || 0,
    longestStreak: user?.stats?.longestStreak || 0,
    totalStudyDays: user?.stats?.totalStudyHours ? Math.floor(user.stats.totalStudyHours / 24) : 0,
    weeklyGoal: user?.studyGoals?.weekly ? Math.ceil(user.studyGoals.weekly / 60) : 5, // convert minutes to hours
    weeklyProgress: Math.min(
      Math.floor((totalStudyTime / 60) / (user?.studyGoals?.daily || 120)) * 7,
      user?.studyGoals?.weekly ? Math.ceil(user.studyGoals.weekly / 60) : 5
    ),
    lastStudyDate: user?.lastActive || new Date()
  };

  const stats = [
    {
      label: 'Current Streak',
      value: `${streakData.currentStreak} day${streakData.currentStreak !== 1 ? 's' : ''}`,
      icon: Trophy,
      color: 'text-orange-600',
      bg: 'bg-orange-100',
      realValue: streakData.currentStreak
    },
    {
      label: 'Total Study Time',
      value: `${Math.floor(totalStudyTime / 60)}h ${Math.floor(totalStudyTime % 60)}m`,
      icon: Time,
      color: 'text-blue-600',
      bg: 'bg-blue-100',
      realValue: totalStudyTime
    },
    {
      label: 'Certificates',
      value: certificates.length,
      icon: Book,
      color: 'text-green-600',
      bg: 'bg-green-100',
      realValue: certificates.length
    },
    {
      label: 'Exam Readiness',
      value: certificates.length > 0 ? `${Math.round(overallProgress)}%` : '0%',
      icon: Trophy,
      color: 'text-purple-600',
      bg: 'bg-purple-100',
      realValue: overallProgress
    }
  ];

  // Calculate today's progress
  const today = new Date().toISOString().split('T')[0];
  const todayMinutes = trackerData.find(d => d.date === today)?.count || 0;
  const dailyGoal = user?.studyGoals?.daily || 120;
  const todayProgress = Math.min(Math.round((todayMinutes / dailyGoal) * 100), 100);

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name || 'Learner'}! 👋
          </h1>
          <p className="text-gray-600 mt-1">
            {certificates.length === 0 
              ? "Let's start your certification journey!" 
              : "Ready to continue your learning journey?"}
          </p>
        </div>
        <Button 
          variant="primary"
          className="bg-purple-600 hover:bg-purple-700 flex items-center space-x-2"
          onClick={() => navigate('/certificates/add')}
        >
          <Add size={18} />
          <span>Add Certificate</span>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Streak Card */}
        <div className="lg:col-span-1">
          <StreakCard 
            currentStreak={streakData.currentStreak}
            longestStreak={streakData.longestStreak}
            totalStudyDays={streakData.totalStudyDays}
            weeklyGoal={streakData.weeklyGoal}
            weeklyProgress={streakData.weeklyProgress}
            lastStudyDate={streakData.lastStudyDate}
          />
        </div>
        
        {/* Other Stats Cards */}
        {stats.slice(1).map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold mt-1 text-gray-900">{stat.value}</p>
                {stat.realValue === 0 && (
                  <p className="text-xs text-gray-400 mt-1">No data yet</p>
                )}
              </div>
              <div className={`${stat.bg} p-3 rounded-lg`}>
                <stat.icon size={24} className={stat.color} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Timer and Quick Actions */}
        <div className="lg:col-span-1 space-y-6">
          <StudyTimer 
            isActive={isActive}
            duration={currentDuration}
            technique={technique}
            onStart={startSession}
            onPause={pauseSession}
            onEnd={endSession}
          />
          
          {/* Quick Actions Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button 
                onClick={() => startSession('focused')}
                className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-purple-50 rounded-lg transition-colors flex items-center space-x-3"
              >
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Time size={18} className="text-purple-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">Start Focus Session</span>
              </button>
              <button 
                onClick={() => startSession('mock-exam')}
                className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-purple-50 rounded-lg transition-colors flex items-center space-x-3"
              >
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <Book size={18} className="text-green-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">Take Mock Exam</span>
              </button>
            </div>
          </div>

          {/* Today's Goal Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-4">Today's Goal</h3>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Progress</span>
                <span className="font-medium text-purple-600">
                  {todayMinutes}/{dailyGoal} min
                </span>
              </div>
              <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full" 
                  style={{ width: `${todayProgress}%` }}
                />
              </div>
              <p className="text-xs text-gray-500">
                {todayMinutes === 0 
                  ? "Start studying to reach your daily goal!"
                  : `${dailyGoal - todayMinutes} minutes remaining to reach daily goal`}
              </p>
              <Button 
                variant="secondary" 
                size="sm" 
                className="w-full mt-2"
                onClick={() => navigate('/profile')}
              >
                Adjust Goal
              </Button>
            </div>
          </div>
        </div>

        {/* Right Column - Certificates and Progress */}
        <div className="lg:col-span-2 space-y-6">
          <ProgressChart data={certificates} />
          
          {/* Recent Certificates Section */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Your Certificates</h2>
              <button 
                onClick={() => navigate('/certificates')}
                className="text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center"
              >
                View all
                <ArrowRight size={16} className="ml-1" />
              </button>
            </div>
            {certificates.length === 0 ? (
              <div className="bg-gray-50 rounded-xl p-8 text-center">
                <Book size={48} className="text-gray-400 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No certificates yet</h3>
                <p className="text-gray-600 mb-4">Start your certification journey today!</p>
                <Button 
                  variant="primary" 
                  size="sm"
                  onClick={() => navigate('/certificates/add')}
                >
                  Add Your First Certificate
                </Button>
              </div>
            ) : (
              <CertificateGrid certificates={certificates.slice(0, 2)} />
            )}
          </div>
        </div>
      </div>

      {/* Tracker Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Study Activity</h2>
            <p className="text-sm text-gray-500 mt-1">
              {totalStudyTime === 0 
                ? "Start studying to see your activity tracker!" 
                : "GitHub-style contribution tracker"}
            </p>
          </div>
        </div>
        
        {trackerData.length === 0 || totalStudyTime === 0 ? (
          <div className="py-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Time size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No study sessions yet</h3>
            <p className="text-gray-600 mb-6">Track your study time to see your activity heatmap</p>
            <Button 
              variant="primary"
              onClick={() => startSession('focused')}
            >
              Start Your First Session
            </Button>
          </div>
        ) : (
          <>
            <TrackerGrid data={trackerData} />
            {/* Tracker Legend */}
            <div className="mt-4 flex items-center justify-end space-x-4 text-xs text-gray-500">
              <span>Less</span>
              <div className="flex space-x-1">
                <div className="w-3 h-3 rounded-sm bg-gray-100"></div>
                <div className="w-3 h-3 rounded-sm bg-purple-200"></div>
                <div className="w-3 h-3 rounded-sm bg-purple-300"></div>
                <div className="w-3 h-3 rounded-sm bg-purple-400"></div>
                <div className="w-3 h-3 rounded-sm bg-purple-600"></div>
              </div>
              <span>More</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;