// components/dashboard/StudyTimer.tsx
import React, { useState, useEffect } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { Play, Pause, Stop, Fire, Time } from '@carbon/icons-react';

interface StudyTimerProps {
  isActive: boolean;
  duration: number;
  technique: 'pomodoro' | 'focused' | 'mock-exam';
  onStart: (technique: 'pomodoro' | 'focused' | 'mock-exam') => void;
  onPause: () => void;
  onEnd: () => void;
}

const StudyTimer: React.FC<StudyTimerProps> = ({
  isActive,
  duration,
  technique,
  onStart,
  onPause,
  onEnd
}) => {
  const [selectedTech, setSelectedTech] = useState(technique);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            onEnd();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, onEnd]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const techniques = [
    { id: 'pomodoro', name: 'Pomodoro', duration: 25, icon: Fire },
    { id: 'focused', name: 'Focused', duration: 50, icon: Time },
    { id: 'mock-exam', name: 'Mock Exam', duration: 120, icon: Play }
  ] as const;

  const handleTechniqueSelect = (tech: typeof techniques[number]) => {
    setSelectedTech(tech.id);
    setTimeLeft(tech.duration * 60);
  };

  

  return (
    <Card className="text-center">
      <h3 className="font-semibold text-gray-900 mb-4">Study Timer</h3>
      
      {/* Timer Display */}
      <div className="mb-6">
        <div className="text-5xl font-bold text-gray-900 font-mono">
          {formatTime(timeLeft)}
        </div>
        <p className="text-sm text-gray-500 mt-2 capitalize">
          {selectedTech.replace('-', ' ')} Session
        </p>
      </div>

      {/* Technique Selection */}
      <div className="grid grid-cols-3 gap-2 mb-6">
        {techniques.map((tech) => (
          <button
            key={tech.id}
            onClick={() => handleTechniqueSelect(tech)}
            className={`p-2 rounded-lg transition-all ${
              selectedTech === tech.id
                ? 'bg-purple-100 text-purple-700 border-2 border-purple-200'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          >
            <tech.icon size={20} className="mx-auto mb-1" />
            <span className="text-xs font-medium">{tech.name}</span>
          </button>
        ))}
      </div>

      {/* Timer Controls */}
      <div className="flex justify-center space-x-3">
        {!isActive ? (
          <Button
            variant="primary"
            onClick={() => onStart(selectedTech)}
            className="bg-purple-600 hover:bg-purple-700 flex items-center space-x-2"
          >
            <Play size={18} />
            <span>Start</span>
          </Button>
        ) : (
          <Button
            variant="secondary"
            onClick={onPause}
            className="border-purple-200 text-purple-700 flex items-center space-x-2"
          >
            <Pause size={18} />
            <span>Pause</span>
          </Button>
        )}
        
        <Button
          variant="secondary"
          onClick={onEnd}
          className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 flex items-center space-x-2"
        >
          <Stop size={18} />
          <span>End</span>
        </Button>
      </div>
    </Card>
  );
};

export default StudyTimer;