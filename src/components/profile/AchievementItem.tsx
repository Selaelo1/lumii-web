// components/profile/AchievementItem.tsx
import React from 'react';
import { Checkmark } from '@carbon/icons-react';

interface AchievementItemProps {
  achievement: {
    id: string;
    name: string;
    description: string;
    icon: React.ElementType;
    unlocked: boolean;
    progress: number;
    target: number;
    color: string;
  };
}

export const AchievementItem: React.FC<AchievementItemProps> = ({ achievement }) => {
  const progress = (achievement.progress / achievement.target) * 100;
  const Icon = achievement.icon;

  return (
    <div className="space-y-1 md:space-y-2">
      <div className="flex items-center gap-2 md:gap-3">
        <div className={`w-6 h-6 md:w-8 md:h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
          achievement.unlocked ? `bg-${achievement.color}-100` : 'bg-gray-100'
        }`}>
          <Icon size={12} className="md:w-4 md:h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <p className={`text-xs md:text-sm font-medium ${
            achievement.unlocked ? 'text-gray-900' : 'text-gray-500'
          }`}>
            {achievement.name}
          </p>
          <p className="text-[10px] md:text-xs text-gray-400 truncate">{achievement.description}</p>
        </div>
        {achievement.unlocked && (
          <Checkmark size={12} className="md:w-3.5 md:h-3.5 text-green-600 flex-shrink-0" />
        )}
      </div>
      {!achievement.unlocked && (
        <div className="pl-8 md:pl-11">
          <div className="flex items-center gap-1 md:gap-2">
            <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-purple-600 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-[10px] md:text-xs text-gray-500">
              {achievement.progress}/{achievement.target}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};