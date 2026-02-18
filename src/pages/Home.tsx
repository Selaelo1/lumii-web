// pages/Home.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { 
  Certificate, 
  ChartLine,  
  Play,
  ArrowRight,
  Timer,
  ExamMode,
  
  Star
} from '@carbon/icons-react';

const Home: React.FC = () => {
  const [readinessMeter, setReadinessMeter] = useState(62);
  const [timerSeconds, setTimerSeconds] = useState(25 * 60);

  // Live timer animation
  useEffect(() => {
    const interval = setInterval(() => {
      setTimerSeconds(prev => {
        if (prev <= 0) return 25 * 60;
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Readiness meter animation
  useEffect(() => {
    const interval = setInterval(() => {
      setReadinessMeter(prev => {
        if (prev >= 78) return 62;
        return prev + 1;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const features = [
    {
      icon: Certificate,
      title: 'Certificate Vault',
      description: 'All your certifications in one place',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Timer,
      title: 'Study Timer + Pomodoro',
      description: 'Stay focused with proven techniques',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: ExamMode,
      title: 'Mock Exams + Readiness',
      description: 'Know exactly when you\'re ready',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: ChartLine,
      title: 'Tracker + Reminders',
      description: 'Build consistent study habits',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const howItWorks = [
    {
      step: 1,
      title: 'Add your certification',
      description: 'Choose from 100+ providers',
      icon: Certificate
    },
    {
      step: 2,
      title: 'Track + practice mocks',
      description: 'Study with proven techniques',
      icon: Timer
    },
    {
      step: 3,
      title: 'See readiness + pass',
      description: 'Know when you\'re exam-ready',
      icon: Star
    }
  ];

  const testimonials = [
    {
      name: 'Alex Chen',
      role: 'AWS Certified Architect',
      quote: 'Lumii helped me track 3 certifications and pass on first try. The readiness score is a game-changer.',
      avatar: 'A',
      rating: 5
    },
    {
      name: 'Sarah Johnson',
      role: 'Google Cloud Professional',
      quote: 'Finally, a tool that keeps all my certs organized. The study timer and mock exams are perfect.',
      avatar: 'S',
      rating: 5
    }
  ];

  return (
    <div className="space-y-24">
      {/* Hero Section with Visual */}
      <section className="relative overflow-hidden pt-12 lg:pt-20">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl" />
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(139, 92, 246, 0.05) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Headline & CTA */}
            <div className="space-y-8">
              {/* Headline */}
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  <span className="bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
                    All your certifications.
                  </span>
                  <br />
                  One study command center.
                </h1>
                
                <p className="text-xl text-gray-600 max-w-lg">
                  Track certifications, monitor progress with GitHub-style heatmaps, 
                  take mock exams, and know exactly when you're ready to pass.
                </p>
              </div>

              {/* Feature Chips */}
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: Certificate, text: 'Certificate Vault' },
                  { icon: Timer, text: 'Study Timer + Pomodoro' },
                  { icon: ExamMode, text: 'Mock Exams + Readiness' }
                ].map((chip, index) => (
                  <div
                    key={index}
                    className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-purple-200 bg-white/80 backdrop-blur-sm shadow-sm"
                  >
                    <chip.icon size={16} className="text-purple-600" />
                    <span className="text-sm font-medium text-gray-700">{chip.text}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link to="/signup">
                  <Button 
                    variant="primary" 
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white shadow-lg shadow-purple-200 hover:shadow-xl transform hover:scale-105 transition-all px-8"
                  >
                    Start Tracking Free
                  </Button>
                </Link>
                
                <div className="relative group">
                  <Button 
                    variant="secondary" 
                    size="lg"
                    className="border-2 border-purple-200 hover:border-purple-300 text-purple-700 hover:bg-purple-50 flex items-center space-x-2"
                  >
                    <Play size={18} />
                    <span>2 min demo</span>
                  </Button>
                  
                  {/* Hover Tooltip */}
                  <div className="absolute top-full left-0 mt-2 w-48 p-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    See Lumii in action ✨
                  </div>
                </div>
              </div>

              {/* Social Proof */}
              <div className="space-y-4 pt-4">
                <p className="text-sm text-gray-500 flex items-center space-x-2">
                  <span>⭐️⭐️⭐️⭐️⭐️</span>
                  <span>Loved by early testers</span>
                </p>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>🎓 Students</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full" />
                  <span>💼 Professionals</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full" />
                  <span>🚀 Lifelong learners</span>
                </div>
              </div>
            </div>

            {/* Right Column - Dashboard Mockup */}
            <div className="relative">
              {/* Device Frame */}
              <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden transform hover:scale-105 transition-transform duration-500">
                {/* Browser Chrome */}
                <div className="bg-gray-100 px-4 py-3 border-b border-gray-200 flex items-center space-x-2">
                  <div className="flex space-x-1.5">
                    <div className="w-3 h-3 bg-red-400 rounded-full" />
                    <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                    <div className="w-3 h-3 bg-green-400 rounded-full" />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="bg-white px-4 py-1 rounded-full text-xs text-gray-500 border border-gray-200">
                      lumii.app/dashboard
                    </div>
                  </div>
                </div>

                {/* Dashboard Preview */}
                <div className="p-6 space-y-4 bg-gradient-to-br from-purple-50/50 to-white">
                  {/* Header */}
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-gray-900">Welcome back, Alex</h3>
                      <p className="text-xs text-gray-500">7 day streak 🔥</p>
                    </div>
                    <div className="px-3 py-1.5 bg-purple-100 rounded-full">
                      <span className="text-xs font-medium text-purple-700">Exam ready</span>
                    </div>
                  </div>

                  {/* Readiness Score - Animated */}
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-purple-100">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Exam Readiness</span>
                      <span className="text-sm font-bold text-purple-600">{readinessMeter}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full transition-all duration-300"
                        style={{ width: `${readinessMeter}%` }}
                      />
                    </div>
                  </div>

                  {/* Countdown + Next Exam */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white rounded-xl p-3 shadow-sm border border-purple-100">
                      <p className="text-xs text-gray-500 mb-1">AWS Solutions</p>
                      <p className="text-lg font-bold text-gray-900">14d</p>
                      <p className="text-xs text-gray-400">until exam</p>
                    </div>
                    <div className="bg-white rounded-xl p-3 shadow-sm border border-purple-100">
                      <p className="text-xs text-gray-500 mb-1">Next mock</p>
                      <p className="text-lg font-bold text-purple-600">Today</p>
                      <p className="text-xs text-gray-400">3:00 PM</p>
                    </div>
                  </div>

                  {/* Heatmap Preview */}
                  <div className="bg-white rounded-xl p-3 shadow-sm border border-purple-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-500">Study activity</span>
                      <div className="flex space-x-0.5">
                        <div className="w-2 h-2 bg-purple-200 rounded-sm" />
                        <div className="w-2 h-2 bg-purple-300 rounded-sm" />
                        <div className="w-2 h-2 bg-purple-400 rounded-sm" />
                        <div className="w-2 h-2 bg-purple-600 rounded-sm" />
                      </div>
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                      {Array.from({ length: 35 }).map((_, i) => {
                        const intensity = Math.floor(Math.random() * 4) as 0 | 1 | 2 | 3;
                        const colors = ['bg-gray-100', 'bg-purple-200', 'bg-purple-300', 'bg-purple-400'];
                        return (
                          <div key={i} className={`w-4 h-4 rounded-sm ${colors[intensity]}`} />
                        );
                      })}
                    </div>
                  </div>

                  {/* Live Timer */}
                  <div className="bg-purple-600 rounded-xl p-3 text-white flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Timer size={16} />
                      <span className="text-xs">Study session</span>
                    </div>
                    <span className="font-mono font-bold">{formatTime(timerSeconds)}</span>
                    <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-purple-200 rounded-full blur-2xl opacity-60" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-300 rounded-full blur-2xl opacity-60" />
            </div>
          </div>
        </div>
      </section>

      {/* How it Works - 3 Step Row */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          How it works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {howItWorks.map((step) => (
            <div key={step.step} className="relative">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center relative">
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </div>
                </div>
                
                {/* Icon */}
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <step.icon size={32} className="text-purple-600" />
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Everything You Need Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
          Everything you need to pass
        </h2>
        <p className="text-gray-500 text-center max-w-2xl mx-auto mb-12">
          Track, practice, and master your certifications with tools designed for serious learners
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} variant="hover" className="p-6">
              <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4`}>
                <feature.icon size={24} className="text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-500">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Loved by early testers
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-lg font-bold text-purple-600">{testimonial.avatar}</span>
                </div>
                <div>
                  <div className="flex items-center space-x-1 mb-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-2">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-medium text-gray-900">{testimonial.name}</p>
                    <p className="text-xs text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-purple-600 to-purple-500 rounded-3xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to level up your learning?</h2>
          <p className="text-lg mb-8 opacity-90">Join thousands of learners tracking their certifications</p>
          <Link to="/signup">
            <Button 
              variant="secondary" 
              size="lg" 
              className="bg-white text-purple-600 hover:bg-gray-100 border-0 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              Get Started Now
              <ArrowRight size={18} className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;