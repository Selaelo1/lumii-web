// components/dashboard/StreakCard.tsx
import React from 'react';
import Card from '../ui/Card';
import { Fire, Calendar, Trophy, Warning } from '@carbon/icons-react';

interface StreakCardProps {
  currentStreak: number;
  longestStreak: number;
  totalStudyDays: number;
  weeklyGoal?: number;
  weeklyProgress?: number;
  lastStudyDate?: Date;
}

const StreakCard: React.FC<StreakCardProps> = ({
  currentStreak,
  longestStreak,
  totalStudyDays,
  weeklyGoal = 5,
  weeklyProgress = 3,
  lastStudyDate = new Date()
}) => {
  // Check if streak is at risk (no study yesterday)
  const isAtRisk = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return lastStudyDate.toDateString() !== yesterday.toDateString() && currentStreak > 0;
  };

  // Get motivational message based on streak
  const getMotivationMessage = () => {
    if (currentStreak === 0) return "Start your streak today! 🚀";
    if (currentStreak < 7) return "Keep it up! You're building momentum! 💪";
    if (currentStreak < 30) return `${currentStreak} day streak! You're on fire! 🔥`;
    if (currentStreak < 100) return `${currentStreak} days! You're a studying machine! ⚡`;
    return `${currentStreak} days! Absolutely legendary! 👑`;
  };

  // Weekly goal progress percentage
  const weeklyProgressPercentage = Math.min((weeklyProgress / weeklyGoal) * 100, 100);

  return (
    <Card variant="hover" className="overflow-hidden relative">
      {/* Decorative gradient background */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-200/30 to-purple-200/30 rounded-full -mr-8 -mt-8 blur-2xl" />
      
      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900 flex items-center">
            <Fire size={20} className="text-orange-500 mr-2" />
            Study Streak
          </h3>
          
          {/* Streak badge */}
          <div className={`flex items-center space-x-1 px-3 py-1.5 rounded-full ${
            currentStreak > 0 
              ? 'bg-orange-100 text-orange-700' 
              : 'bg-gray-100 text-gray-600'
          }`}>
            <Fire size={16} />
            <span className="text-sm font-bold">{currentStreak} days</span>
          </div>
        </div>

        {/* Main streak stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{currentStreak}</div>
            <div className="text-xs text-gray-500 mt-1">Current</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{longestStreak}</div>
            <div className="text-xs text-gray-500 mt-1">Longest</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{totalStudyDays}</div>
            <div className="text-xs text-gray-500 mt-1">Total Days</div>
          </div>
        </div>

        {/* Weekly goal progress */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 flex items-center">
              <Calendar size={14} className="mr-1 text-purple-500" />
              Weekly Goal
            </span>
            <span className="text-sm font-medium">
              {weeklyProgress}/{weeklyGoal} days
            </span>
          </div>
          <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-orange-500 to-purple-600 rounded-full transition-all duration-500"
              style={{ width: `${weeklyProgressPercentage}%` }}
            />
          </div>
        </div>

        {/* Motivational message */}
        <div className={`text-sm p-3 rounded-lg ${
          currentStreak > 0 ? 'bg-purple-50 text-purple-700' : 'bg-gray-50 text-gray-600'
        }`}>
          {getMotivationMessage()}
        </div>

        {/* Streak at risk warning */}
        {isAtRisk() && currentStreak > 0 && (
          <div className="mt-3 flex items-center space-x-2 text-xs text-orange-600 bg-orange-50 p-2 rounded-lg">
            <Warning size={14} />
            <span>Study today to keep your streak alive! 🔥</span>
          </div>
        )}

        {/* Achievement badges for milestones */}
        {currentStreak >= 7 && (
          <div className="mt-3 flex items-center space-x-2 text-xs text-purple-600 bg-purple-50 p-2 rounded-lg">
            <Trophy size={14} />
            <span>Week streak unlocked! 🎉</span>
          </div>
        )}
      </div>
    </Card>
  );
};

export default StreakCard;