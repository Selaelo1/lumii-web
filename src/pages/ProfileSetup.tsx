// pages/ProfileSetup.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import { 
  User,
  ArrowRight,
  Rocket,
  Checkmark,
  Time,
  Notification
} from '@carbon/icons-react';

const ProfileSetup: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateUserProfile, isLoading } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Info
    displayName: user?.name || '',
    bio: '',
    avatar: '',
    
    // Study Preferences
    dailyGoal: 120, // minutes
    weeklyGoal: 600, // minutes
    preferredStudyTime: 'morning' as 'morning' | 'afternoon' | 'evening',
    
    // Career/Education
    currentRole: '',
    experienceLevel: 'beginner' as 'beginner' | 'intermediate' | 'advanced',
    
    // Notification Settings
    emailNotifications: true,
    studyReminders: true,
    reminderTime: '09:00'
  });

  const [selectedCerts, setSelectedCerts] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const certifications = [
    'AWS Certified Solutions Architect',
    'AWS Certified Developer',
    'Google Cloud Professional',
    'Microsoft Azure Fundamentals',
    'Microsoft Azure Administrator',
    'CompTIA Security+',
    'CompTIA Network+',
    'CISSP',
    'PMP',
    'Certified Scrum Master',
    'Python Institute PCAP',
    'Oracle Certified Professional',
    'Cisco CCNA',
    'Cisco CCNP',
    'Other'
  ];

  const handleCertificationToggle = (cert: string) => {
    setSelectedCerts(prev => {
      if (prev.includes(cert)) {
        return prev.filter(c => c !== cert);
      } else {
        return [...prev, cert];
      }
    });
  };

  const handleSubmit = async () => {
    if (!user) return;
    
    setIsSubmitting(true);
    
    try {
      console.log('🟡 Saving profile setup data...');
      
      // Save ALL profile data to Firestore
      await updateUserProfile({
        name: formData.displayName,
        bio: formData.bio,
        currentRole: formData.currentRole,
        experienceLevel: formData.experienceLevel,
        targetCertifications: selectedCerts,
        preferredStudyTime: formData.preferredStudyTime,
        reminderTime: formData.reminderTime,
        studyGoals: {
          daily: formData.dailyGoal,
          weekly: formData.weeklyGoal
        },
        preferences: {
          emailNotifications: formData.emailNotifications,
          studyReminders: formData.studyReminders,
          theme: 'light' as const
        },
        isProfileComplete: true // Mark profile as complete!
      });
      
      console.log('🟢 Profile setup completed successfully!');
      
      // Navigate to dashboard after successful setup
      navigate('/dashboard');
    } catch (error) {
      console.error('🔴 Profile setup error:', error);
      alert('Failed to save profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const isStepValid = () => {
    if (step === 1) {
      return formData.displayName.trim().length > 0;
    }
    if (step === 2) {
      return formData.dailyGoal >= 15 && formData.weeklyGoal >= 60;
    }
    return true;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Rocket size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to Lumii! 🚀
          </h1>
          <p className="text-gray-600">
            Let's set up your profile to personalize your learning journey
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-purple-600">
              Step {step} of 3
            </span>
            <span className="text-sm text-gray-500">
              {step === 1 ? 'Personal Info' : step === 2 ? 'Study Goals' : 'Preferences'}
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-600 to-purple-400 transition-all duration-500"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <Card className="p-8 shadow-xl border-0">
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <User size={20} className="text-purple-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Tell us about yourself</h2>
              </div>
              
              <Input
                label="Display Name *"
                value={formData.displayName}
                onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                placeholder="How should we call you?"
                icon={<User size={18} />}
                required
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio (optional)
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Tell us a bit about yourself and your learning goals..."
                  rows={3}
                  className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Role
                </label>
                <input
                  type="text"
                  value={formData.currentRole}
                  onChange={(e) => setFormData({ ...formData, currentRole: e.target.value })}
                  placeholder="e.g., Software Engineer, Student, IT Professional"
                  className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Experience Level
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'beginner', label: '🌱 Beginner' },
                    { value: 'intermediate', label: '🌿 Intermediate' },
                    { value: 'advanced', label: '🌳 Advanced' }
                  ].map((level) => (
                    <button
                      key={level.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, experienceLevel: level.value as any })}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        formData.experienceLevel === level.value
                          ? 'border-purple-500 bg-purple-50 text-purple-700'
                          : 'border-gray-200 hover:border-purple-200 hover:bg-gray-50'
                      }`}
                    >
                      <span className="font-medium">{level.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Time size={20} className="text-purple-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Set your study goals</h2>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Daily Goal (minutes) *
                  </label>
                  <input
                    type="number"
                    value={formData.dailyGoal}
                    onChange={(e) => setFormData({ ...formData, dailyGoal: parseInt(e.target.value) || 120 })}
                    min={15}
                    max={480}
                    step={15}
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {Math.floor(formData.dailyGoal / 60)}h {formData.dailyGoal % 60}m per day
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Weekly Goal (minutes) *
                  </label>
                  <input
                    type="number"
                    value={formData.weeklyGoal}
                    onChange={(e) => setFormData({ ...formData, weeklyGoal: parseInt(e.target.value) || 600 })}
                    min={60}
                    max={1680}
                    step={60}
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {Math.floor(formData.weeklyGoal / 60)}h per week
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Study Time
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'morning', label: '🌅 Morning', time: '6AM - 12PM' },
                    { value: 'afternoon', label: '☀️ Afternoon', time: '12PM - 5PM' },
                    { value: 'evening', label: '🌙 Evening', time: '5PM - 11PM' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, preferredStudyTime: option.value as any })}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        formData.preferredStudyTime === option.value
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-200 hover:bg-gray-50'
                      }`}
                    >
                      <div className="font-medium">{option.label}</div>
                      <div className="text-xs text-gray-500 mt-1">{option.time}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Certifications (select all that apply)
                </label>
                <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto p-3 border border-gray-200 rounded-lg bg-gray-50">
                  {certifications.map((cert) => (
                    <label 
                      key={cert} 
                      className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer transition-all ${
                        selectedCerts.includes(cert) ? 'bg-purple-100' : 'hover:bg-gray-100'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedCerts.includes(cert)}
                        onChange={() => handleCertificationToggle(cert)}
                        className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="text-sm text-gray-700">{cert}</span>
                    </label>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Selected: {selectedCerts.length} certification{selectedCerts.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Notification size={20} className="text-purple-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Notification Preferences</h2>
              </div>
              
              <div className="space-y-4">
                <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-all">
                  <div>
                    <p className="font-medium text-gray-900">Email Notifications</p>
                    <p className="text-sm text-gray-500">Receive updates about your progress and new features</p>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={formData.emailNotifications}
                      onChange={(e) => setFormData({ ...formData, emailNotifications: e.target.checked })}
                      className="sr-only"
                    />
                    <div className={`w-12 h-6 rounded-full transition-colors ${
                      formData.emailNotifications ? 'bg-purple-600' : 'bg-gray-300'
                    }`}>
                      <div className={`w-5 h-5 rounded-full bg-white transform transition-transform mt-0.5 ${
                        formData.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </div>
                  </div>
                </label>

                <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-all">
                  <div>
                    <p className="font-medium text-gray-900">Study Reminders</p>
                    <p className="text-sm text-gray-500">Get daily reminders to stay on track with your goals</p>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={formData.studyReminders}
                      onChange={(e) => setFormData({ ...formData, studyReminders: e.target.checked })}
                      className="sr-only"
                    />
                    <div className={`w-12 h-6 rounded-full transition-colors ${
                      formData.studyReminders ? 'bg-purple-600' : 'bg-gray-300'
                    }`}>
                      <div className={`w-5 h-5 rounded-full bg-white transform transition-transform mt-0.5 ${
                        formData.studyReminders ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </div>
                  </div>
                </label>

                {formData.studyReminders && (
                  <div className="pl-4 animate-fadeIn">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Reminder Time
                    </label>
                    <input
                      type="time"
                      value={formData.reminderTime}
                      onChange={(e) => setFormData({ ...formData, reminderTime: e.target.value })}
                      className="w-full max-w-xs rounded-lg border border-gray-200 bg-white px-4 py-2.5 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                    />
                  </div>
                )}
              </div>

              {/* Summary Card */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 p-6 rounded-xl mt-8 border border-purple-200">
                <h3 className="font-semibold text-purple-900 mb-4 flex items-center">
                  <Checkmark size={18} className="mr-2" />
                  Profile Summary
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-purple-700 font-medium">Personal</p>
                    <p className="text-gray-700 mt-1">{formData.displayName || 'Not set'}</p>
                    <p className="text-gray-600 text-xs capitalize">{formData.experienceLevel}</p>
                  </div>
                  <div>
                    <p className="text-purple-700 font-medium">Study Goals</p>
                    <p className="text-gray-700 mt-1">{formData.dailyGoal} min daily</p>
                    <p className="text-gray-600 text-xs">{formData.weeklyGoal} min weekly</p>
                  </div>
                  <div>
                    <p className="text-purple-700 font-medium">Target Certs</p>
                    <p className="text-gray-700 mt-1">{selectedCerts.length} selected</p>
                  </div>
                  <div>
                    <p className="text-purple-700 font-medium">Reminders</p>
                    <p className="text-gray-700 mt-1">
                      {formData.studyReminders ? `At ${formData.reminderTime}` : 'Off'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
            {step > 1 && (
              <Button 
                variant="secondary" 
                onClick={prevStep}
                disabled={isSubmitting}
              >
                Back
              </Button>
            )}
            {step < 3 ? (
              <Button 
                variant="primary" 
                onClick={nextStep}
                disabled={!isStepValid() || isSubmitting}
                className="bg-gradient-to-r from-purple-600 to-purple-500 ml-auto group"
              >
                Continue
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            ) : (
              <Button 
                variant="primary" 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-gradient-to-r from-purple-600 to-purple-500 ml-auto group"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    Complete Setup
                    <Rocket size={16} className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </Button>
            )}
          </div>
        </Card>

        {/* Skip Option */}
        <p className="text-center text-sm text-gray-400 mt-4">
          You can always update your profile later in settings
        </p>
      </div>

      {/* Add animation style */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ProfileSetup;