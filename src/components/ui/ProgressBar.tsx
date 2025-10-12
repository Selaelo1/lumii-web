import React from 'react';
import { cn } from '../../utils/cn';

interface ProgressBarProps {
  percentage: number;
  className?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'success' | 'warning' | 'danger';
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  percentage,
  className,
  showLabel = true,
  size = 'md',
  color = 'primary'
}) => {
  const heights = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  };
  
  const colors = {
    primary: 'bg-purpleAccent',
    success: 'bg-success',
    warning: 'bg-warning',
    danger: 'bg-error'
  };

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-charcoal">Progress</span>
          <span className="text-sm text-gray-500">{percentage}%</span>
        </div>
      )}
      <div className={cn('w-full bg-gray-200 rounded-full overflow-hidden', heights[size])}>
        <div
          className={cn('transition-all duration-500 ease-out rounded-full', colors[color], heights[size])}
          style={{ width: `${Math.min(100, Math.max(0, percentage))}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;