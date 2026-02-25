// components/dashboard/ProgressChart.tsx
import React from 'react';
import Card from '../ui/Card';
import { Certificate } from '../../types';

interface ProgressChartProps {
  data: Certificate[];
}

const ProgressChart: React.FC<ProgressChartProps> = ({ data }) => {
  const totalProgress = data.reduce((acc, cert) => acc + cert.progress, 0) / data.length;
  const completed = data.filter(c => c.status === 'completed').length;
  const examReady = data.filter(c => c.status === 'exam-ready').length;
  const inProgress = data.filter(c => c.status === 'in-progress').length;

  const statusData = [
    { label: 'Completed', value: completed, color: 'bg-green-500' },
    { label: 'Exam Ready', value: examReady, color: 'bg-purple-500' },
    { label: 'In Progress', value: inProgress, color: 'bg-blue-500' }
  ];

  return (
    <Card>
      <h3 className="font-semibold text-gray-900 mb-4">Overall Progress</h3>
      
      {/* Circular Progress */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative w-32 h-32">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#f3f4f6"
              strokeWidth="8"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * (1 - totalProgress / 100)}`}
              transform="rotate(-90 50 50)"
              className="transition-all duration-500"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-gray-900">{Math.round(totalProgress)}%</span>
          </div>
        </div>
      </div>

      {/* Status Breakdown */}
      <div className="space-y-3">
        {statusData.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${item.color}`} />
              <span className="text-sm text-gray-600">{item.label}</span>
            </div>
            <span className="text-sm font-medium">{item.value}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ProgressChart;