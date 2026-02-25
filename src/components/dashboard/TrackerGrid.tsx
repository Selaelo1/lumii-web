// components/dashboard/TrackerGrid.tsx
import React from 'react';
import { TrackerDay } from '../../types';

interface TrackerGridProps {
  data: TrackerDay[];
  months?: number;
}

const TrackerGrid: React.FC<TrackerGridProps> = ({ data, months = 6 }) => {
  const getIntensityColor = (intensity: number): string => {
    const colors = {
      0: 'bg-gray-100',
      1: 'bg-purple-200',
      2: 'bg-purple-300',
      3: 'bg-purple-400',
      4: 'bg-purple-600'
    };
    return colors[intensity as keyof typeof colors] || colors[0];
  };

  // Group data by month
  const groupedByMonth = data.reduce((acc, day) => {
    const month = new Date(day.date).toLocaleString('default', { month: 'short' });
    if (!acc[month]) acc[month] = [];
    acc[month].push(day);
    return acc;
  }, {} as Record<string, TrackerDay[]>);

  const months_order = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  return (
    <div className="space-y-4">
      {/* Legend */}
      <div className="flex items-center justify-end space-x-4 text-xs text-gray-500">
        <span>Less</span>
        <div className="flex space-x-1">
          {[0, 1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className={`w-3 h-3 rounded-sm ${getIntensityColor(level)}`}
            />
          ))}
        </div>
        <span>More</span>
      </div>

      {/* Tracker Grid */}
      <div className="overflow-x-auto pb-2">
        <div className="flex space-x-8 min-w-max">
          {Object.entries(groupedByMonth)
            .sort(([a], [b]) => months_order.indexOf(a) - months_order.indexOf(b))
            .map(([month, days]) => (
              <div key={month} className="space-y-2">
                <span className="text-xs font-medium text-gray-500">{month}</span>
                <div className="grid grid-cols-7 gap-1">
                  {days.map((day, index) => (
                    <div
                      key={index}
                      className={`w-4 h-4 rounded-sm ${getIntensityColor(day.intensity)} transition-colors hover:ring-2 hover:ring-purple-300 cursor-help`}
                      title={`${new Date(day.date).toLocaleDateString()}: ${day.count} minutes`}
                    />
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Summary */}
      <div className="flex justify-between text-sm text-gray-600 pt-4 border-t border-gray-100">
        <span>Total study time: {data.reduce((acc, day) => acc + day.count, 0)} minutes</span>
        <span>{data.filter(d => d.count > 0).length} active days</span>
      </div>
    </div>
  );
};

export default TrackerGrid;