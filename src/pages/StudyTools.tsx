// pages/StudyTools.tsx
import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { 
  Timer, 
  TimeFilled, 
  ExamMode, 
  ChartLine, 
  Settings,
  Play,
  Pause,
  Reset,
  Time,
} from '@carbon/icons-react';

type StudyMode = 'pomodoro' | 'focused' | 'mock-exam';

const StudyTools: React.FC = () => {
  const [activeMode, setActiveMode] = useState<StudyMode>('pomodoro');
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [selectedTechnique, setSelectedTechnique] = useState<string>('pomodoro');

  const modes = [
    { 
      id: 'pomodoro', 
      name: 'Pomodoro', 
      icon: TimeFilled, 
      duration: 25,
      description: '25 minutes of focused work, then a short break',
      color: 'text-red-500',
      bg: 'bg-red-50'
    },
    { 
      id: 'focused', 
      name: 'Focused Session', 
      icon: Timer, 
      duration: 50,
      description: 'Extended focus time for deep work',
      color: 'text-blue-500',
      bg: 'bg-blue-50'
    },
    { 
      id: 'mock-exam', 
      name: 'Mock Exam', 
      icon: ExamMode, 
      duration: 120,
      description: 'Simulate real exam conditions',
      color: 'text-purple-500',
      bg: 'bg-purple-50'
    }
  ];

  const techniques = [
    {
      name: 'Pomodoro',
      description: 'Work in 25-minute intervals with short breaks',
      icon: TimeFilled,
      duration: 25,
      popular: true
    },
    {
      name: '52/17',
      description: '52 minutes work, 17 minutes break',
      icon: Timer,
      duration: 52,
      popular: false
    },
    {
      name: '90/20',
      description: '90 minutes deep work, 20 minutes rest',
      icon: Time,
      duration: 90,
      popular: false
    },
    {
      name: 'Custom',
      description: 'Set your own work/break intervals',
      icon: Settings,
      duration: 0,
      popular: false
    }
  ];

  const mockExams = [
    {
      id: 1,
      name: 'AWS Solutions Architect - Practice Exam 1',
      questions: 65,
      duration: 130,
      difficulty: 'Medium',
      passRate: '75%'
    },
    {
      id: 2,
      name: 'AWS Solutions Architect - Practice Exam 2',
      questions: 65,
      duration: 130,
      difficulty: 'Hard',
      passRate: '62%'
    },
    {
      id: 3,
      name: 'Google Cloud Professional - Mock Test',
      questions: 50,
      duration: 120,
      difficulty: 'Medium',
      passRate: '81%'
    }
  ];

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Study Tools</h1>
        <p className="text-gray-600 mt-1">Choose your study technique and start learning effectively</p>
      </div>

      {/* Mode Selector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {modes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => setActiveMode(mode.id as StudyMode)}
            className={`p-6 rounded-xl border-2 transition-all text-left ${
              activeMode === mode.id
                ? 'border-purple-500 bg-purple-50'
                : 'border-gray-200 bg-white hover:border-purple-200'
            }`}
          >
            <div className={`w-12 h-12 ${mode.bg} rounded-xl flex items-center justify-center mb-3`}>
              <mode.icon size={24} className={mode.color} />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">{mode.name}</h3>
            <p className="text-sm text-gray-500">{mode.description}</p>
            <p className="text-xs text-purple-600 mt-2">{mode.duration} minutes</p>
          </button>
        ))}
      </div>

      {/* Active Tool Section */}
      <Card className="p-8">
        {activeMode === 'pomodoro' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Pomodoro Timer</h2>
              <p className="text-gray-500">Work in focused sprints with regular breaks</p>
            </div>

            {/* Timer Display */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-48 h-48 rounded-full border-8 border-purple-100 flex items-center justify-center">
                  <div className="text-4xl font-bold text-gray-900">{formatTime(timeLeft)}</div>
                </div>
                <div className="absolute -top-2 -right-2 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <TimeFilled size={24} className="text-red-500" />
                </div>
              </div>
            </div>

            {/* Timer Controls */}
            <div className="flex justify-center space-x-4">
              {!isActive ? (
                <Button
                  variant="primary"
                  onClick={() => setIsActive(true)}
                  className="bg-purple-600 hover:bg-purple-700 flex items-center space-x-2 px-8"
                >
                  <Play size={18} />
                  <span>Start</span>
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  onClick={() => setIsActive(false)}
                  className="border-purple-200 text-purple-700 flex items-center space-x-2 px-8"
                >
                  <Pause size={18} />
                  <span>Pause</span>
                </Button>
              )}
              <Button
                variant="secondary"
                onClick={() => {
                  setIsActive(false);
                  setTimeLeft(25 * 60);
                }}
                className="border-gray-200 text-gray-600 flex items-center space-x-2"
              >
                <Reset size={18} />
                <span>Reset</span>
              </Button>
            </div>

            {/* Technique Selection */}
            <div className="pt-6 border-t border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4">Choose Technique</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {techniques.map((tech) => (
                  <button
                    key={tech.name}
                    onClick={() => setSelectedTechnique(tech.name)}
                    className={`p-3 rounded-lg border transition-all ${
                      selectedTechnique === tech.name
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-200'
                    }`}
                  >
                    <tech.icon size={20} className="text-purple-600 mx-auto mb-2" />
                    <p className="text-sm font-medium">{tech.name}</p>
                    {tech.duration > 0 && (
                      <p className="text-xs text-gray-500">{tech.duration} min</p>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeMode === 'focused' && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Focused Study Session</h2>
              <p className="text-gray-500">Extended focus time for deep learning</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="font-semibold mb-4">Session Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Duration (minutes)</label>
                    <input 
                      type="number" 
                      value={50}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Break Duration</label>
                    <select className="w-full px-3 py-2 border border-gray-200 rounded-lg">
                      <option>5 minutes</option>
                      <option>10 minutes</option>
                      <option>15 minutes</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Focus Music</label>
                    <select className="w-full px-3 py-2 border border-gray-200 rounded-lg">
                      <option>None</option>
                      <option>Lo-fi</option>
                      <option>Classical</option>
                      <option>White Noise</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 p-6 rounded-xl">
                <h3 className="font-semibold mb-4">Active Session</h3>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-600 mb-2">50:00</div>
                  <p className="text-sm text-gray-600 mb-4">Ready to start</p>
                  <Button className="bg-purple-600 hover:bg-purple-700 w-full">
                    Start Focus Session
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeMode === 'mock-exam' && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Mock Exams</h2>
              <p className="text-gray-500">Test your knowledge under exam conditions</p>
            </div>

            <div className="space-y-4">
              {mockExams.map((exam) => (
                <div key={exam.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-purple-200 transition-colors">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <ExamMode size={20} className="text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{exam.name}</h4>
                      <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                        <span>{exam.questions} questions</span>
                        <span>{exam.duration} minutes</span>
                        <span className={`px-2 py-0.5 rounded-full ${
                          exam.difficulty === 'Easy' ? 'bg-green-100 text-green-600' :
                          exam.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-600' :
                          'bg-red-100 text-red-600'
                        }`}>
                          {exam.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Pass rate</p>
                      <p className="font-semibold text-green-600">{exam.passRate}</p>
                    </div>
                    <Button variant="primary" size="sm" className="bg-purple-600 hover:bg-purple-700">
                      Start Exam
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 p-4 rounded-lg mt-4">
              <p className="text-sm text-blue-800">
                <span className="font-semibold">Pro tip:</span> Take mock exams in a quiet environment 
                with no interruptions to simulate real exam conditions.
              </p>
            </div>
          </div>
        )}
      </Card>

      {/* Study Stats */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <ChartLine size={20} className="text-purple-600 mr-2" />
          Your Study Statistics
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-gray-500">Total Sessions</p>
            <p className="text-xl font-bold text-gray-900">47</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Focus Hours</p>
            <p className="text-xl font-bold text-gray-900">32.5h</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Pomodoros</p>
            <p className="text-xl font-bold text-gray-900">78</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Mock Exams</p>
            <p className="text-xl font-bold text-gray-900">12</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default StudyTools;