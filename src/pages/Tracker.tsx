// pages/Tracker.tsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTracker } from '../hooks/useTracker';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { 
  Calendar, 
   
  Fire, 
  Time, 
  
  Download,
  Filter,
  ChevronLeft,
  ChevronRight,
  Trophy,
  
} from '@carbon/icons-react';

const Tracker: React.FC = () => {
  const { user } = useAuth();
  const { trackerData, currentStreak, totalStudyTime, getContributionLevel } = useTracker(user?.id || '');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [view, setView] = useState<'year' | 'month' | 'week'>('year');

  // Mock data for demonstration - replace with actual data from hook
  const weeklyData = [
    { day: 'Mon', minutes: 45 },
    { day: 'Tue', minutes: 60 },
    { day: 'Wed', minutes: 30 },
    { day: 'Thu', minutes: 90 },
    { day: 'Fri', minutes: 120 },
    { day: 'Sat', minutes: 75 },
    { day: 'Sun', minutes: 0 },
  ];

  const monthlyData = [
    { week: 'Week 1', total: 320 },
    { week: 'Week 2', total: 450 },
    { week: 'Week 3', total: 280 },
    { week: 'Week 4', total: 520 },
  ];

  const stats = [
    {
      label: 'Current Streak',
      value: `${currentStreak} days`,
      icon: Fire,
      color: 'text-orange-600',
      bg: 'bg-orange-100',
      change: '+2 from last week'
    },
    {
      label: 'Total Study Time',
      value: `${Math.floor(totalStudyTime / 60)}h ${totalStudyTime % 60}m`,
      icon: Time,
      color: 'text-blue-600',
      bg: 'bg-blue-100',
      change: '+12% vs last month'
    },
    {
      label: 'Active Days',
      value: trackerData.filter(d => d.count > 0).length,
      icon: Calendar,
      color: 'text-green-600',
      bg: 'bg-green-100',
      change: 'this year'
    },
    {
      label: 'Best Streak',
      value: '15 days',
      icon: Trophy,
      color: 'text-purple-600',
      bg: 'bg-purple-100',
      change: 'Achieved in March'
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Study Tracker</h1>
          <p className="text-gray-600 mt-1">Track your consistency and build lasting study habits</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="secondary" size="sm" className="flex items-center space-x-2">
            <Download size={16} />
            <span>Export Data</span>
          </Button>
          <Button variant="secondary" size="sm" className="flex items-center space-x-2">
            <Filter size={16} />
            <span>Filter</span>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className={`${stat.bg} p-3 rounded-lg`}>
                <stat.icon size={20} className={stat.color} />
              </div>
              <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                {stat.change}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </Card>
        ))}
      </div>

      {/* View Toggle and Year Selector */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex bg-gray-100 rounded-lg p-1">
          {(['year', 'month', 'week'] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                view === v
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ChevronLeft size={20} className="text-gray-600" />
          </button>
          <span className="font-medium text-gray-900">{selectedYear}</span>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ChevronRight size={20} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Main Tracker View */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Contribution Activity</h2>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>Less</span>
            <div className="flex space-x-1">
              <div className="w-4 h-4 rounded-sm bg-gray-100"></div>
              <div className="w-4 h-4 rounded-sm bg-purple-200"></div>
              <div className="w-4 h-4 rounded-sm bg-purple-300"></div>
              <div className="w-4 h-4 rounded-sm bg-purple-400"></div>
              <div className="w-4 h-4 rounded-sm bg-purple-600"></div>
            </div>
            <span>More</span>
          </div>
        </div>

        {/* GitHub-style Contribution Grid */}
        <div className="overflow-x-auto pb-4">
          <div className="min-w-max">
            {/* Months header */}
            <div className="flex text-xs text-gray-400 mb-2 pl-8">
              <div className="w-8"></div>
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(month => (
                <div key={month} className="w-8 mx-0.5 text-center">{month}</div>
              ))}
            </div>

            {/* Contribution grid */}
            <div className="flex">
              {/* Weekdays */}
              <div className="text-xs text-gray-400 space-y-1 pr-2">
                <div className="h-4 flex items-center">Mon</div>
                <div className="h-4 flex items-center">Wed</div>
                <div className="h-4 flex items-center">Fri</div>
              </div>

              {/* Contribution squares */}
              <div className="flex">
                {Array.from({ length: 52 }).map((_, weekIndex) => (
                  <div key={weekIndex} className="space-y-1 mx-0.5">
                    {Array.from({ length: 7 }).map((_, dayIndex) => {
                      const intensity = Math.floor(Math.random() * 5) as 0 | 1 | 2 | 3 | 4;
                      const colors = {
                        0: 'bg-gray-100',
                        1: 'bg-purple-200',
                        2: 'bg-purple-300',
                        3: 'bg-purple-400',
                        4: 'bg-purple-600'
                      };
                      return (
                        <div
                          key={dayIndex}
                          className={`w-4 h-4 rounded-sm ${colors[intensity]} transition-colors hover:ring-2 hover:ring-purple-300 cursor-help`}
                          title={`${Math.floor(Math.random() * 120)} minutes on this day`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-6 pt-6 border-t border-gray-100 flex flex-wrap gap-6">
          <div>
            <p className="text-sm text-gray-500">Total contributions this year</p>
            <p className="text-2xl font-bold text-gray-900">12,480 minutes</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Longest streak</p>
            <p className="text-2xl font-bold text-gray-900">15 days</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Best day</p>
            <p className="text-2xl font-bold text-gray-900">March 15, 2024</p>
          </div>
        </div>
      </Card>

      {/* Weekly Overview */}
      {view === 'week' && (
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">This Week's Overview</h2>
          <div className="space-y-4">
            {weeklyData.map((day) => (
              <div key={day.day} className="flex items-center space-x-4">
                <span className="w-12 text-sm font-medium text-gray-600">{day.day}</span>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full"
                        style={{ width: `${(day.minutes / 120) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600">{day.minutes} min</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Monthly Breakdown */}
      {view === 'month' && (
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Monthly Breakdown</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {monthlyData.map((week) => (
              <div key={week.week} className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">{week.week}</p>
                <p className="text-xl font-bold text-gray-900">{week.total} minutes</p>
                <div className="mt-2 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-purple-600 rounded-full"
                    style={{ width: `${(week.total / 600) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Insights Section */}
      <Card className="p-6 bg-gradient-to-r from-purple-50 to-white border-purple-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          
          Insights & Recommendations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Most Productive Time</p>
            <p className="font-semibold text-gray-900">Morning (8 AM - 11 AM)</p>
            <p className="text-xs text-green-600 mt-1">↑ 23% more effective</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Recommended Focus</p>
            <p className="font-semibold text-gray-900">AWS Certificate</p>
            <p className="text-xs text-orange-600 mt-1">Exam in 14 days</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Study Pattern</p>
            <p className="font-semibold text-gray-900">Consistent on weekdays</p>
            <p className="text-xs text-purple-600 mt-1">Weekends need work</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Tracker;