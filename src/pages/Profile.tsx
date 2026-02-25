// pages/Profile.tsx
import { useState, useEffect, useMemo, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTracker } from '../hooks/useTracker';
import { useCertificates } from '../hooks/useCertificates';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Modal from '../components/ui/Modal';
import {
  Edit,
  Certificate,
  Time,
  Trophy,
  Group,
  Notification,
  ChartLine,
  Pin,
  Camera,
  Checkmark,
  Warning,
  Email,
  Calendar,
  Star,
  Watch,
  Book,
  ArrowsHorizontal,
  Settings,
  Logout,
  Link as LinkIcon,
  ChevronRight,
  Moon,
  Sun,
  Download,
  Upload,
  TrashCan,
  Save,
  User,
  Phone,
  Globe,
  Menu,
  Close,
  CheckmarkFilled
} from '@carbon/icons-react';

// Custom SVG icons for social platforms
const GithubIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.253-.447-1.27.098-2.646 0 0 .84-.269 2.75 1.025.8-.223 1.65-.334 2.5-.334.85 0 1.7.111 2.5.334 1.91-1.294 2.75-1.025 2.75-1.025.545 1.376.201 2.393.099 2.646.64.698 1.03 1.591 1.03 2.682 0 3.841-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" fill="currentColor"/>
  </svg>
);

const LinkedinIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.778-.773 1.778-1.729V1.729C24 .774 23.204 0 22.225 0z" fill="currentColor"/>
  </svg>
);

const TwitterIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.104c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0021.775-3.374 14.5 14.5 0 002.076-7.545c0-.06.002-.12.007-.18a9.935 9.935 0 002.43-2.48z" fill="currentColor"/>
  </svg>
);

type TabKey = 'overview' | 'certificates' | 'activity' | 'settings';

interface Activity {
  type: 'study' | 'certificate' | 'exam' | 'group';
  description: string;
  time: string;
  duration?: number;
  score?: number;
  progress?: number;
  metadata?: any;
}

function SetupItem({ done, label }: { done: boolean; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 shadow-sm hover:shadow-md transition-all">
      <span
        className={`h-5 w-5 rounded-full grid place-items-center text-xs ${
          done ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-400'
        }`}
      >
        {done ? <CheckmarkFilled size={12} /> : '•'}
      </span>
      <span className={done ? 'text-gray-900 font-medium' : 'text-gray-600'}>{label}</span>
    </div>
  );
}

export default function Profile() {
  const { user, updateUserProfile, updateUserEmail, updateUserPassword, logout, isLoading: authLoading } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const {
    totalStudyTime,
    currentStreak,
    sessions,
    isLoading: trackerLoading,
  } = useTracker(12);

  const { certificates, overallProgress, isLoading: certsLoading } = useCertificates(user?.id);

  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>('overview');
  const [isUploading, setIsUploading] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: user?.preferences?.emailNotifications ?? true,
    studyReminders: user?.preferences?.studyReminders ?? true,
    reminderTime: user?.reminderTime ?? '09:00',
    theme: user?.preferences?.theme ?? 'light',
    weeklyReport: true,
    achievementAlerts: true,
    groupActivity: true
  });

  const [editForm, setEditForm] = useState({
    name: '',
    bio: '',
    currentRole: '',
    location: '',
    website: '',
    github: '',
    linkedin: '',
    twitter: '',
    phone: '',
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [emailForm, setEmailForm] = useState({
    newEmail: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Computed values
  const completedCerts = useMemo(
    () => certificates.filter((c: any) => c.progress === 100),
    [certificates]
  );
  
  const inProgressCerts = useMemo(
    () => certificates.filter((c: any) => c.progress > 0 && c.progress < 100),
    [certificates]
  );
  
  const examReadyCerts = useMemo(
    () => certificates.filter((c: any) => c.progress >= 80 && c.progress < 100),
    [certificates]
  );

  const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    const intervals = [
      { label: 'year', seconds: 31536000 },
      { label: 'month', seconds: 2592000 },
      { label: 'day', seconds: 86400 },
      { label: 'hour', seconds: 3600 },
      { label: 'minute', seconds: 60 },
    ];

    for (const interval of intervals) {
      const count = Math.floor(seconds / interval.seconds);
      if (count > 0) {
        return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
      }
    }
    return 'just now';
  };

  // Initialize edit form with user data
  useEffect(() => {
    if (user) {
      setEditForm({
        name: user.name || '',
        bio: user.bio || '',
        currentRole: user.currentRole || '',
        location: user.location || '',
        website: user.website || '',
        github: user.github || '',
        linkedin: user.linkedin || '',
        twitter: user.twitter || '',
        phone: user.phone || '',
      });
    }
  }, [user]);

  // Handle image upload
  const handleImageUpload = async (file: File, type: 'avatar' | 'cover') => {
    setIsUploading(true);
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        await updateUserProfile({
          [type === 'avatar' ? 'avatar' : 'coverPhoto']: base64String
        });
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setIsUploading(false);
    }
  };

  // Handle profile save
  const handleSaveProfile = async () => {
    try {
      await updateUserProfile({
        name: editForm.name,
        bio: editForm.bio,
        currentRole: editForm.currentRole,
        location: editForm.location,
        website: editForm.website,
        github: editForm.github,
        linkedin: editForm.linkedin,
        twitter: editForm.twitter,
        phone: editForm.phone,
        preferences: notificationSettings
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  // Handle password change
  const handlePasswordChange = async () => {
    setFormErrors({});
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setFormErrors({ confirmPassword: 'Passwords do not match' });
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setFormErrors({ newPassword: 'Password must be at least 6 characters' });
      return;
    }

    try {
      await updateUserPassword(passwordForm.currentPassword, passwordForm.newPassword);
      setShowPasswordModal(false);
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error: any) {
      setFormErrors({ currentPassword: error.message || 'Failed to update password' });
    }
  };

  // Handle email change
  const handleEmailChange = async () => {
    setFormErrors({});
    
    if (!emailForm.newEmail.includes('@')) {
      setFormErrors({ newEmail: 'Invalid email address' });
      return;
    }

    try {
      await updateUserEmail(emailForm.newEmail, emailForm.password);
      setShowEmailModal(false);
      setEmailForm({ newEmail: '', password: '' });
    } catch (error: any) {
      setFormErrors({ password: error.message || 'Failed to update email' });
    }
  };

  // Calculate profile stats
  const profileStats = useMemo(() => {
    const totalMinutes = (user?.stats?.totalStudyHours ?? totalStudyTime) || 0;
    const totalHours = Math.floor(totalMinutes / 60);
    const completed = user?.stats?.certificatesCompleted ?? completedCerts.length;
    const inProgress = inProgressCerts.length;
    const streak = currentStreak || user?.streak || 0;
    const longest = user?.stats?.longestStreak || streak || 0;

    return {
      totalStudyHours: totalHours,
      totalStudyMinutes: totalMinutes,
      certificatesCompleted: completed,
      certificatesInProgress: inProgress,
      currentStreak: streak,
      longestStreak: longest,
      overallProgress: Math.round(overallProgress || 0),
      groupsJoined: user?.groups?.length || 0,
      achievements: user?.achievements?.length || 0,
    };
  }, [user, totalStudyTime, currentStreak, certificates, completedCerts, inProgressCerts, overallProgress]);

  // Recent activity
  const recentActivity = useMemo(() => {
    const activity: Activity[] = [];

    sessions.slice(0, 3).forEach((session: any) => {
      const cert = certificates.find((c: any) => c.id === session.certificateId);
      activity.push({
        type: 'study',
        description: `Studied ${cert?.name || 'certification'}`,
        time: getTimeAgo(session.date),
        duration: session.duration,
        metadata: session
      });
    });

    completedCerts.slice(0, 2).forEach((cert: any) => {
      activity.push({
        type: 'certificate',
        description: `Completed ${cert.name}`,
        time: cert.completedDate ? getTimeAgo(new Date(cert.completedDate)) : 'Recently',
        progress: 100,
        metadata: cert
      });
    });

    return activity.sort((a, b) => {
      if (a.time.includes('just now')) return -1;
      if (b.time.includes('just now')) return 1;
      return 0;
    }).slice(0, 5);
  }, [sessions, certificates, completedCerts]);

  // Achievements
  const achievements = useMemo(
    () => [
      {
        id: 'early-bird',
        name: 'Early Bird',
        description: 'Study before 8 AM',
        icon: Time,
        unlocked: sessions.some((s: any) => s.date.getHours() < 8),
        progress: sessions.filter((s: any) => s.date.getHours() < 8).length,
        target: 5,
        color: 'amber'
      },
      {
        id: 'streak-master',
        name: 'Streak Master',
        description: 'Maintain a 7-day streak',
        icon: Trophy,
        unlocked: profileStats.longestStreak >= 7,
        progress: Math.min(profileStats.longestStreak, 7),
        target: 7,
        color: 'orange'
      },
      {
        id: 'dedicated-learner',
        name: 'Dedicated Learner',
        description: 'Study 10+ hours total',
        icon: Watch,
        unlocked: profileStats.totalStudyHours >= 10,
        progress: Math.min(profileStats.totalStudyHours, 10),
        target: 10,
        color: 'blue'
      },
      {
        id: 'certificate-collector',
        name: 'Certificate Collector',
        description: 'Complete 5 certificates',
        icon: Certificate,
        unlocked: profileStats.certificatesCompleted >= 5,
        progress: Math.min(profileStats.certificatesCompleted, 5),
        target: 5,
        color: 'green'
      },
      {
        id: 'consistency-king',
        name: 'Consistency King',
        description: 'Study 30 days total',
        icon: Calendar,
        unlocked: sessions.length >= 30,
        progress: Math.min(sessions.length, 30),
        target: 30,
        color: 'purple'
      },
      {
        id: 'exam-warrior',
        name: 'Exam Warrior',
        description: 'Complete 10 practice exams',
        icon: ChartLine,
        unlocked: sessions.filter((s: any) => s.technique === 'mock-exam').length >= 10,
        progress: Math.min(sessions.filter((s: any) => s.technique === 'mock-exam').length, 10),
        target: 10,
        color: 'red'
      },
    ],
    [sessions, profileStats]
  );

  const joinDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : 'Recently';

  const isNewUser = sessions.length === 0 && certificates.length === 0;

  if (authLoading || trackerLoading || certsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 bg-purple-100 rounded-full animate-pulse"></div>
            </div>
          </div>
          <p className="mt-4 text-gray-600 font-medium">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-12">
      {/* Cover Photo Section - Fixed for mobile */}
      <div className="relative h-48 md:h-64 lg:h-80 bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 overflow-hidden">
        {user?.coverPhoto ? (
          <img 
            src={user.coverPhoto} 
            alt="Cover" 
            className="w-full h-full object-cover opacity-90"
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1)_0%,transparent_50%)]"></div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
        
        {/* Mobile-friendly cover actions */}
        <div className="absolute bottom-4 right-4 flex gap-2">
          <input
            type="file"
            ref={coverInputRef}
            className="hidden"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleImageUpload(file, 'cover');
            }}
          />
          <button
            onClick={() => coverInputRef.current?.click()}
            disabled={isUploading}
            className="px-3 md:px-4 py-2 bg-white/90 backdrop-blur-sm rounded-xl text-xs md:text-sm font-medium text-gray-900 hover:bg-white transition-all flex items-center gap-2 shadow-lg"
          >
            {isUploading ? (
              <>
                <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="hidden md:inline">Uploading...</span>
              </>
            ) : (
              <>
                <Camera size={16} />
                <span className="hidden md:inline">Change Cover</span>
              </>
            )}
          </button>
        </div>

        {/* Profile info - Fixed positioning for mobile */}
        <div className="absolute -bottom-16 left-4 md:left-8 flex flex-col md:flex-row items-start md:items-end gap-4 md:gap-6">
          <div className="relative">
            <div className="w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-2xl bg-white p-1 shadow-2xl ring-4 ring-white/50">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full rounded-xl object-cover"
                />
              ) : (
                <div className="w-full h-full rounded-xl bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center">
                  <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </span>
                </div>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImageUpload(file, 'avatar');
              }}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="absolute -bottom-1 -right-1 bg-purple-600 p-2 rounded-xl text-white hover:bg-purple-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
            >
              {isUploading ? (
                <div className="w-3 h-3 md:w-4 md:h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Camera size={14} className="md:w-4 md:h-4" />
              )}
            </button>
          </div>

          <div className="pb-2 md:pb-4 text-white">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">{user?.name || 'Learner'}</h1>
            <p className="text-white/90 flex items-center gap-2 mt-1 text-sm md:text-base">
              <Pin size={14} className="md:w-4 md:h-4" />
              {user?.location || 'Add your location'}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content - Adjusted spacing for mobile */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-24">
        {/* Action Bar - Stack on mobile */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            <span className="px-2 md:px-3 py-1 md:py-1.5 bg-purple-100 text-purple-700 rounded-xl text-xs md:text-sm font-medium flex items-center gap-1 md:gap-2">
              <Star size={12} className="md:w-4 md:h-4" />
              <span className="truncate max-w-[150px]">{user?.experienceLevel ? `${user.experienceLevel} level` : 'Set your level'}</span>
            </span>
            {isNewUser && (
              <span className="px-2 md:px-3 py-1 md:py-1.5 bg-blue-100 text-blue-700 rounded-xl text-xs md:text-sm font-medium flex items-center gap-1 md:gap-2">
                <Trophy size={12} className="md:w-4 md:h-4" />
                New Learner
              </span>
            )}
          </div>

          <div className="flex gap-2 md:gap-3 w-full sm:w-auto">
            <Button
              variant="secondary"
              onClick={() => setIsEditing(true)}
              className="flex-1 sm:flex-none items-center justify-center gap-2 bg-white hover:bg-gray-50 px-3 md:px-4 py-2 text-sm"
            >
              <Edit size={14} className="md:w-4 md:h-4" />
              <span>Edit</span>
            </Button>
            <Button
              variant="primary"
              className="flex-1 sm:flex-none bg-purple-600 hover:bg-purple-700 items-center justify-center gap-2 px-3 md:px-4 py-2 text-sm"
              onClick={() => window.location.href = '/study-tools'}
            >
              <Watch size={14} className="md:w-4 md:h-4" />
              <span>Study</span>
            </Button>
          </div>
        </div>

        {/* Stats Grid - Better mobile grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
          <Card className="p-3 md:p-5 hover:shadow-lg transition-all border border-gray-100">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] md:text-xs font-medium text-gray-500 uppercase tracking-wider">Study Time</p>
                <p className="mt-1 md:mt-2 text-lg md:text-2xl font-bold text-gray-900">{profileStats.totalStudyHours}h</p>
              </div>
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                <Time size={16} className="md:w-5 md:h-5 text-purple-600" />
              </div>
            </div>
            <div className="mt-2 md:mt-3 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-purple-600 rounded-full"
                style={{ width: `${Math.min((profileStats.totalStudyHours / 50) * 100, 100)}%` }}
              ></div>
            </div>
          </Card>

          <Card className="p-3 md:p-5 hover:shadow-lg transition-all border border-gray-100">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] md:text-xs font-medium text-gray-500 uppercase tracking-wider">Streak</p>
                <p className="mt-1 md:mt-2 text-lg md:text-2xl font-bold text-gray-900">{profileStats.currentStreak}</p>
              </div>
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-orange-50 flex items-center justify-center">
                <Trophy size={16} className="md:w-5 md:h-5 text-orange-600" />
              </div>
            </div>
            {profileStats.currentStreak > 0 && (
              <p className="mt-1 text-[10px] md:text-xs text-orange-600 font-medium">
                Best: {profileStats.longestStreak}d
              </p>
            )}
          </Card>

          <Card className="p-3 md:p-5 hover:shadow-lg transition-all border border-gray-100">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] md:text-xs font-medium text-gray-500 uppercase tracking-wider">Certs</p>
                <p className="mt-1 md:mt-2 text-lg md:text-2xl font-bold text-gray-900">{certificates.length}</p>
              </div>
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-green-50 flex items-center justify-center">
                <Certificate size={16} className="md:w-5 md:h-5 text-green-600" />
              </div>
            </div>
            <p className="mt-1 text-[10px] md:text-xs text-gray-500">
              {profileStats.certificatesCompleted} done
            </p>
          </Card>

          <Card className="p-3 md:p-5 hover:shadow-lg transition-all border border-gray-100">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] md:text-xs font-medium text-gray-500 uppercase tracking-wider">Ready</p>
                <p className="mt-1 md:mt-2 text-lg md:text-2xl font-bold text-gray-900">{profileStats.overallProgress}%</p>
              </div>
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <ArrowsHorizontal size={16} className="md:w-5 md:h-5 text-blue-600" />
              </div>
            </div>
            <div className="mt-2 md:mt-3 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 rounded-full"
                style={{ width: `${profileStats.overallProgress}%` }}
              ></div>
            </div>
          </Card>
        </div>

        {/* Mobile Tabs Dropdown */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-xl border border-gray-200 shadow-sm"
          >
            <span className="font-medium text-gray-900 flex items-center gap-2">
              {activeTab === 'overview' && <Book size={18} className="text-purple-600" />}
              {activeTab === 'certificates' && <Certificate size={18} className="text-purple-600" />}
              {activeTab === 'activity' && <ChartLine size={18} className="text-purple-600" />}
              {activeTab === 'settings' && <Settings size={18} className="text-purple-600" />}
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </span>
            {isMobileMenuOpen ? <Close size={18} className="text-gray-500" /> : <Menu size={18} className="text-gray-500" />}
          </button>
          
          {isMobileMenuOpen && (
            <div className="absolute z-10 mt-2 w-full bg-white rounded-xl border border-gray-200 shadow-lg py-2">
              {[
                { id: 'overview', label: 'Overview', icon: Book },
                { id: 'certificates', label: 'Certificates', icon: Certificate },
                { id: 'activity', label: 'Activity', icon: ChartLine },
                { id: 'settings', label: 'Settings', icon: Settings },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as TabKey);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left ${
                    activeTab === tab.id ? 'bg-purple-50 text-purple-600' : 'text-gray-700'
                  }`}
                >
                  <tab.icon size={18} />
                  <span>{tab.label}</span>
                  {activeTab === tab.id && <Checkmark size={16} className="ml-auto" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Desktop Tabs */}
        <div className="hidden md:block border-b border-gray-200 mb-6">
          <nav className="flex flex-wrap gap-2">
            {[
              { id: 'overview', label: 'Overview', icon: Book },
              { id: 'certificates', label: 'Certificates', icon: Certificate },
              { id: 'activity', label: 'Activity', icon: ChartLine },
              { id: 'settings', label: 'Settings', icon: Settings },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabKey)}
                className={`flex items-center gap-2 px-4 py-3 font-medium text-sm border-b-2 transition-all ${
                  activeTab === tab.id
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon size={16} />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content - Better mobile spacing */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <>
                {/* Bio Card */}
                <Card className="p-4 md:p-6 border border-gray-100">
                  <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Star size={16} className="md:w-[18px] md:h-[18px] text-purple-600" />
                    About
                  </h2>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    {user?.bio || 'No bio yet. Click edit profile to introduce yourself!'}
                  </p>
                  
                  {/* Social Links - Scrollable on mobile */}
                  <div className="mt-4 flex flex-wrap gap-2 md:gap-3">
                    {editForm.github && (
                      <a href={editForm.github} target="_blank" rel="noopener noreferrer" 
                         className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1 md:py-1.5 bg-gray-50 rounded-lg text-xs md:text-sm text-gray-600 hover:bg-gray-100">
                        <GithubIcon size={14} className="md:w-4 md:h-4" />
                        <span className="hidden md:inline">GitHub</span>
                      </a>
                    )}
                    {editForm.linkedin && (
                      <a href={editForm.linkedin} target="_blank" rel="noopener noreferrer"
                         className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1 md:py-1.5 bg-gray-50 rounded-lg text-xs md:text-sm text-gray-600 hover:bg-gray-100">
                        <LinkedinIcon size={14} className="md:w-4 md:h-4" />
                        <span className="hidden md:inline">LinkedIn</span>
                      </a>
                    )}
                    {editForm.twitter && (
                      <a href={editForm.twitter} target="_blank" rel="noopener noreferrer"
                         className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1 md:py-1.5 bg-gray-50 rounded-lg text-xs md:text-sm text-gray-600 hover:bg-gray-100">
                        <TwitterIcon size={14} className="md:w-4 md:h-4" />
                        <span className="hidden md:inline">Twitter</span>
                      </a>
                    )}
                    {editForm.website && (
                      <a href={editForm.website} target="_blank" rel="noopener noreferrer"
                         className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1 md:py-1.5 bg-gray-50 rounded-lg text-xs md:text-sm text-gray-600 hover:bg-gray-100">
                        <Globe size={14} className="md:w-4 md:h-4" />
                        <span className="hidden md:inline">Website</span>
                      </a>
                    )}
                  </div>
                </Card>

                {/* Recent Activity */}
                <Card className="p-4 md:p-6 border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-base md:text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <Watch size={16} className="md:w-[18px] md:h-[18px] text-purple-600" />
                      Recent Activity
                    </h2>
                    {recentActivity.length > 0 && (
                      <button className="text-xs md:text-sm text-purple-600 hover:text-purple-700 font-medium">
                        View all
                      </button>
                    )}
                  </div>

                  {recentActivity.length > 0 ? (
                    <div className="space-y-3 md:space-y-4">
                      {recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-start gap-3 md:gap-4 p-2 md:p-3 rounded-xl hover:bg-gray-50 transition-colors">
                          <div className={`w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                            activity.type === 'study' ? 'bg-purple-50' :
                            activity.type === 'certificate' ? 'bg-green-50' : 'bg-blue-50'
                          }`}>
                            {activity.type === 'study' && <Time size={14} className="md:w-[18px] md:h-[18px] text-purple-600" />}
                            {activity.type === 'certificate' && <Certificate size={14} className="md:w-[18px] md:h-[18px] text-green-600" />}
                            {activity.type === 'exam' && <ChartLine size={14} className="md:w-[18px] md:h-[18px] text-blue-600" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs md:text-sm font-medium text-gray-900 truncate">{activity.description}</p>
                            <p className="text-[10px] md:text-xs text-gray-500 mt-0.5 md:mt-1">{activity.time}</p>
                          </div>
                          {activity.duration && (
                            <span className="text-xs md:text-sm text-gray-500">{activity.duration}m</span>
                          )}
                          {activity.score && (
                            <span className="text-xs md:text-sm font-medium text-green-600">{activity.score}%</span>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 md:py-8">
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Watch size={20} className="md:w-6 md:h-6 text-gray-400" />
                      </div>
                      <p className="text-sm md:text-base text-gray-600 font-medium">No activity yet</p>
                      <p className="text-xs md:text-sm text-gray-500 mt-1">Start studying to see your activity here</p>
                      <Button
                        variant="primary"
                        size="sm"
                        className="mt-4 bg-purple-600 hover:bg-purple-700 text-xs md:text-sm"
                        onClick={() => window.location.href = '/study-tools'}
                      >
                        Start Your First Session
                      </Button>
                    </div>
                  )}
                </Card>

                {/* Target Certifications */}
                <Card className="p-4 md:p-6 border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-base md:text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <Watch size={16} className="md:w-[18px] md:h-[18px] text-purple-600" />
                      Target Certifications
                    </h2>
                    <button
                      onClick={() => window.location.href = '/certificates/add'}
                      className="text-xs md:text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1"
                    >
                      Add new
                      <ChevronRight size={14} className="md:w-4 md:h-4" />
                    </button>
                  </div>

                  {user?.targetCertifications && user.targetCertifications.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
                      {user.targetCertifications.map((cert, index) => {
                        const progress = certificates.find((c: any) => c.name === cert)?.progress || 0;
                        return (
                          <div key={index} className="p-2 md:p-3 bg-gray-50 rounded-xl">
                            <p className="font-medium text-gray-900 text-xs md:text-sm truncate">{cert}</p>
                            <div className="mt-1 md:mt-2 flex items-center gap-2">
                              <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-purple-600 rounded-full"
                                  style={{ width: `${progress}%` }}
                                />
                              </div>
                              <span className="text-[10px] md:text-xs font-medium text-purple-600">{progress}%</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-xs md:text-sm text-gray-500">No target certifications set</p>
                  )}
                </Card>
              </>
            )}

            {/* Certificates Tab */}
            {activeTab === 'certificates' && (
              <Card className="p-4 md:p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-4 md:mb-6">
                  <h2 className="text-base md:text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Certificate size={16} className="md:w-[18px] md:h-[18px] text-purple-600" />
                    My Certificates
                  </h2>
                  <Button
                    variant="primary"
                    size="sm"
                    className="bg-purple-600 hover:bg-purple-700 text-xs md:text-sm"
                    onClick={() => window.location.href = '/certificates/add'}
                  >
                    Add Certificate
                  </Button>
                </div>

                {certificates.length > 0 ? (
                  <div className="space-y-4 md:space-y-6">
                    {inProgressCerts.length > 0 && (
                      <div>
                        <h3 className="text-xs md:text-sm font-medium text-gray-500 mb-2 md:mb-3 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-500 rounded-full"></div>
                          In Progress ({inProgressCerts.length})
                        </h3>
                        <div className="space-y-2 md:space-y-3">
                          {inProgressCerts.map((cert: any) => (
                            <div key={cert.id} className="p-3 md:p-4 bg-white border border-gray-100 rounded-xl hover:shadow-md transition-all">
                              <div className="flex items-start justify-between gap-2 md:gap-3">
                                <div className="min-w-0 flex-1">
                                  <p className="text-sm md:text-base font-semibold text-gray-900 truncate">{cert.name}</p>
                                  {cert.targetDate && (
                                    <p className="text-[10px] md:text-xs text-gray-500 mt-0.5 md:mt-1">
                                      Target: {new Date(cert.targetDate).toLocaleDateString()}
                                    </p>
                                  )}
                                </div>
                                <span className="text-base md:text-lg font-bold text-purple-600">{cert.progress}%</span>
                              </div>
                              <div className="mt-2 md:mt-3 h-1.5 md:h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-purple-600 rounded-full transition-all duration-500"
                                  style={{ width: `${cert.progress}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {examReadyCerts.length > 0 && (
                      <div>
                        <h3 className="text-xs md:text-sm font-medium text-gray-500 mb-2 md:mb-3 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-orange-500 rounded-full"></div>
                          Exam Ready ({examReadyCerts.length})
                        </h3>
                        <div className="space-y-2 md:space-y-3">
                          {examReadyCerts.map((cert: any) => (
                            <div key={cert.id} className="p-3 md:p-4 bg-orange-50 border border-orange-100 rounded-xl">
                              <div className="flex items-center justify-between gap-2">
                                <div>
                                  <p className="text-sm md:text-base font-semibold text-gray-900">{cert.name}</p>
                                  <p className="text-[10px] md:text-xs text-orange-700 mt-0.5 md:mt-1">Ready for exam</p>
                                </div>
                                <Warning size={16} className="md:w-5 md:h-5 text-orange-600" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {completedCerts.length > 0 && (
                      <div>
                        <h3 className="text-xs md:text-sm font-medium text-gray-500 mb-2 md:mb-3 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full"></div>
                          Completed ({completedCerts.length})
                        </h3>
                        <div className="space-y-2 md:space-y-3">
                          {completedCerts.map((cert: any) => (
                            <div key={cert.id} className="p-3 md:p-4 bg-green-50 border border-green-100 rounded-xl">
                              <div className="flex items-center justify-between gap-2">
                                <div>
                                  <p className="text-sm md:text-base font-semibold text-gray-900">{cert.name}</p>
                                  <p className="text-[10px] md:text-xs text-green-700 mt-0.5 md:mt-1">
                                    {cert.completedDate 
                                      ? new Date(cert.completedDate).toLocaleDateString()
                                      : 'Completed'}
                                  </p>
                                </div>
                                <Checkmark size={16} className="md:w-5 md:h-5 text-green-600" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8 md:py-12">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Certificate size={24} className="md:w-8 md:h-8 text-gray-400" />
                    </div>
                    <p className="text-sm md:text-base text-gray-900 font-medium mb-2">No certificates yet</p>
                    <p className="text-xs md:text-sm text-gray-500 mb-4 md:mb-6">Add your first certification to start tracking progress</p>
                    <Button
                      variant="primary"
                      className="bg-purple-600 hover:bg-purple-700 text-xs md:text-sm"
                      onClick={() => window.location.href = '/certificates/add'}
                    >
                      Add Certificate
                    </Button>
                  </div>
                )}
              </Card>
            )}

            {/* Activity Tab */}
            {activeTab === 'activity' && (
              <Card className="p-4 md:p-6 border border-gray-100">
                <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-4 md:mb-6 flex items-center gap-2">
                  <ChartLine size={16} className="md:w-[18px] md:h-[18px] text-purple-600" />
                  Study Analytics
                </h2>

                {sessions.length > 0 ? (
                  <div className="space-y-6 md:space-y-8">
                    <div className="grid grid-cols-2 gap-2 md:gap-4">
                      <div className="p-2 md:p-4 bg-gray-50 rounded-xl">
                        <p className="text-[10px] md:text-xs text-gray-500">Sessions</p>
                        <p className="text-lg md:text-2xl font-bold text-gray-900 mt-0.5 md:mt-1">{sessions.length}</p>
                      </div>
                      <div className="p-2 md:p-4 bg-gray-50 rounded-xl">
                        <p className="text-[10px] md:text-xs text-gray-500">Hours</p>
                        <p className="text-lg md:text-2xl font-bold text-gray-900 mt-0.5 md:mt-1">{Math.round(totalStudyTime / 60)}</p>
                      </div>
                      <div className="p-2 md:p-4 bg-gray-50 rounded-xl">
                        <p className="text-[10px] md:text-xs text-gray-500">Average</p>
                        <p className="text-lg md:text-2xl font-bold text-gray-900 mt-0.5 md:mt-1">
                          {Math.round(totalStudyTime / sessions.length)}m
                        </p>
                      </div>
                      <div className="p-2 md:p-4 bg-gray-50 rounded-xl">
                        <p className="text-[10px] md:text-xs text-gray-500">Best Streak</p>
                        <p className="text-lg md:text-2xl font-bold text-gray-900 mt-0.5 md:mt-1">{profileStats.longestStreak}d</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xs md:text-sm font-medium text-gray-700 mb-2 md:mb-3">Study Techniques</h3>
                      <div className="space-y-2 md:space-y-3">
                        {[
                          { tech: 'pomodoro', label: 'Pomodoro', color: 'purple' },
                          { tech: 'focused', label: 'Focused', color: 'blue' },
                          { tech: 'mock-exam', label: 'Mock Exam', color: 'green' },
                        ].map(({ tech, label, color }) => {
                          const count = sessions.filter((s: any) => s.technique === tech).length;
                          const percentage = sessions.length > 0 ? Math.round((count / sessions.length) * 100) : 0;
                          
                          return (
                            <div key={tech} className="flex items-center gap-2 md:gap-3">
                              <span className="text-[10px] md:text-xs text-gray-600 w-16 md:w-24">{label}</span>
                              <div className="flex-1 h-1.5 md:h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full bg-${color}-600 rounded-full`}
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                              <span className="text-[10px] md:text-xs text-gray-600 w-10 md:w-16 text-right">{percentage}%</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xs md:text-sm font-medium text-gray-700 mb-2 md:mb-3">Recent Sessions</h3>
                      <div className="space-y-1.5 md:space-y-2">
                        {sessions.slice(0, 5).map((session: any, index: number) => (
                          <div key={index} className="flex items-center justify-between p-2 md:p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-2 md:gap-3">
                              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-purple-500 rounded-full"></div>
                              <div>
                                <p className="text-xs md:text-sm font-medium text-gray-900">
                                  {session.technique?.replace('-', ' ') || 'Study session'}
                                </p>
                                <p className="text-[10px] md:text-xs text-gray-500">{getTimeAgo(session.date)}</p>
                              </div>
                            </div>
                            <span className="text-xs md:text-sm text-gray-600">{session.duration}m</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 md:py-12">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ChartLine size={24} className="md:w-8 md:h-8 text-gray-400" />
                    </div>
                    <p className="text-sm md:text-base text-gray-900 font-medium mb-2">No study data yet</p>
                    <p className="text-xs md:text-sm text-gray-500 mb-4 md:mb-6">Start tracking your study sessions</p>
                    <Button
                      variant="primary"
                      className="bg-purple-600 hover:bg-purple-700 text-xs md:text-sm"
                      onClick={() => window.location.href = '/study-tools'}
                    >
                      Start Studying
                    </Button>
                  </div>
                )}
              </Card>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <Card className="p-4 md:p-6 border border-gray-100">
                <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-4 md:mb-6 flex items-center gap-2">
                  <Settings size={16} className="md:w-[18px] md:h-[18px] text-purple-600" />
                  Account Settings
                </h2>

                <div className="space-y-6 md:space-y-8">
                  <div>
                    <h3 className="text-xs md:text-sm font-medium text-gray-700 mb-3 md:mb-4">Notifications</h3>
                    <div className="space-y-3 md:space-y-4">
                      <label className="flex items-center justify-between p-2 md:p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                        <div className="flex items-center gap-2 md:gap-3">
                          <Notification size={14} className="md:w-[18px] md:h-[18px] text-gray-600" />
                          <span className="text-xs md:text-sm text-gray-700">Email Notifications</span>
                        </div>
                        <input
                          type="checkbox"
                          checked={notificationSettings.emailNotifications}
                          onChange={(e) => setNotificationSettings(prev => ({ ...prev, emailNotifications: e.target.checked }))}
                          className="w-4 h-4 md:w-5 md:h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                      </label>

                      <label className="flex items-center justify-between p-2 md:p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                        <div className="flex items-center gap-2 md:gap-3">
                          <Watch size={14} className="md:w-[18px] md:h-[18px] text-gray-600" />
                          <span className="text-xs md:text-sm text-gray-700">Study Reminders</span>
                        </div>
                        <input
                          type="checkbox"
                          checked={notificationSettings.studyReminders}
                          onChange={(e) => setNotificationSettings(prev => ({ ...prev, studyReminders: e.target.checked }))}
                          className="w-4 h-4 md:w-5 md:h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                      </label>

                      {notificationSettings.studyReminders && (
                        <div className="pl-6 md:pl-8">
                          <label className="block text-[10px] md:text-xs text-gray-600 mb-1 md:mb-2">Reminder Time</label>
                          <input
                            type="time"
                            value={notificationSettings.reminderTime}
                            onChange={(e) => setNotificationSettings(prev => ({ ...prev, reminderTime: e.target.value }))}
                            className="px-2 md:px-3 py-1.5 md:py-2 text-xs md:text-sm border border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                          />
                        </div>
                      )}

                      <label className="flex items-center justify-between p-2 md:p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                        <div className="flex items-center gap-2 md:gap-3">
                          <Trophy size={14} className="md:w-[18px] md:h-[18px] text-gray-600" />
                          <span className="text-xs md:text-sm text-gray-700">Achievement Alerts</span>
                        </div>
                        <input
                          type="checkbox"
                          checked={notificationSettings.achievementAlerts}
                          onChange={(e) => setNotificationSettings(prev => ({ ...prev, achievementAlerts: e.target.checked }))}
                          className="w-4 h-4 md:w-5 md:h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                      </label>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs md:text-sm font-medium text-gray-700 mb-3 md:mb-4">Appearance</h3>
                    <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                      {['light', 'dark', 'system'].map((theme) => (
                        <button
                          key={theme}
                          onClick={() => setNotificationSettings(prev => ({ ...prev, theme: theme as any }))}
                          className={`flex-1 p-2 md:p-3 rounded-lg border-2 transition-all ${
                            notificationSettings.theme === theme
                              ? 'border-purple-600 bg-purple-50'
                              : 'border-gray-200 hover:border-purple-200'
                          }`}
                        >
                          <div className="flex items-center justify-center gap-1 md:gap-2">
                            {theme === 'light' && <Sun size={14} className="md:w-4 md:h-4 text-gray-600" />}
                            {theme === 'dark' && <Moon size={14} className="md:w-4 md:h-4 text-gray-600" />}
                            {theme === 'system' && <Settings size={14} className="md:w-4 md:h-4 text-gray-600" />}
                            <span className="text-[10px] md:text-xs capitalize">{theme}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs md:text-sm font-medium text-gray-700 mb-3 md:mb-4">Account</h3>
                    <div className="space-y-2 md:space-y-3">
                      <button
                        onClick={() => setShowEmailModal(true)}
                        className="w-full text-left px-3 md:px-4 py-2 md:py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-between"
                      >
                        <span className="text-xs md:text-sm text-gray-700">Change Email Address</span>
                        <ChevronRight size={14} className="md:w-4 md:h-4 text-gray-400" />
                      </button>

                      <button
                        onClick={() => setShowPasswordModal(true)}
                        className="w-full text-left px-3 md:px-4 py-2 md:py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-between"
                      >
                        <span className="text-xs md:text-sm text-gray-700">Change Password</span>
                        <ChevronRight size={14} className="md:w-4 md:h-4 text-gray-400" />
                      </button>

                      <button
                        onClick={logout}
                        className="w-full text-left px-3 md:px-4 py-2 md:py-3 bg-gray-50 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors flex items-center justify-between group"
                      >
                        <span className="text-xs md:text-sm">Sign Out</span>
                        <Logout size={14} className="md:w-4 md:h-4 text-gray-400 group-hover:text-red-600" />
                      </button>

                      <button
                        onClick={() => setShowDeleteConfirm(true)}
                        className="w-full text-left px-3 md:px-4 py-2 md:py-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-between"
                      >
                        <span className="text-xs md:text-sm text-red-600">Delete Account</span>
                        <TrashCan size={14} className="md:w-4 md:h-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Sidebar - Better mobile layout */}
          <div className="space-y-4 md:space-y-6">
            <Card className="p-4 md:p-6 border border-gray-100">
              <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-3 md:mb-4">Contact</h3>
              <div className="space-y-2 md:space-y-3">
                <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm">
                  <Email size={14} className="md:w-4 md:h-4 text-purple-600 flex-shrink-0" />
                  <span className="text-gray-600 truncate">{user?.email}</span>
                </div>
                {editForm.phone && (
                  <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm">
                    <Phone size={14} className="md:w-4 md:h-4 text-purple-600 flex-shrink-0" />
                    <span className="text-gray-600">{editForm.phone}</span>
                  </div>
                )}
                {editForm.location && (
                  <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm">
                    <Pin size={14} className="md:w-4 md:h-4 text-purple-600 flex-shrink-0" />
                    <span className="text-gray-600">{editForm.location}</span>
                  </div>
                )}
              </div>
            </Card>

            <Card className="p-4 md:p-6 border border-gray-100">
              <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-3 md:mb-4 flex items-center gap-2">
                <Trophy size={16} className="md:w-[18px] md:h-[18px] text-purple-600" />
                Achievements
                <span className="ml-auto text-[10px] md:text-xs text-gray-500">
                  {achievements.filter(a => a.unlocked).length}/{achievements.length}
                </span>
              </h3>
              
              <div className="space-y-3 md:space-y-4">
                {achievements.slice(0, 4).map((achievement) => {
                  const progress = (achievement.progress / achievement.target) * 100;
                  return (
                    <div key={achievement.id} className="space-y-1 md:space-y-2">
                      <div className="flex items-center gap-2 md:gap-3">
                        <div className={`w-6 h-6 md:w-8 md:h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          achievement.unlocked ? `bg-${achievement.color}-100` : 'bg-gray-100'
                        }`}>
                          <achievement.icon size={12} className="md:w-4 md:h-4" />
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
                })}
              </div>

              {achievements.length > 4 && (
                <button className="mt-3 md:mt-4 text-[10px] md:text-xs text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1">
                  View all achievements
                  <ChevronRight size={12} className="md:w-3.5 md:h-3.5" />
                </button>
              )}
            </Card>

            <Card className="p-4 md:p-6 border border-gray-100">
              <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-3 md:mb-4 flex items-center gap-2">
                <Group size={16} className="md:w-[18px] md:h-[18px] text-purple-600" />
                Study Groups
              </h3>

              <div className="space-y-2 md:space-y-3">
                {[
                  { name: 'AWS Solutions Architects', members: 24, active: true },
                  { name: 'Python Data Science', members: 18, active: true },
                  { name: 'Google Cloud Platform', members: 32, active: false },
                ].map((group, index) => (
                  <div key={index} className="flex items-center justify-between p-1.5 md:p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${group.active ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <div>
                        <p className="text-xs md:text-sm font-medium text-gray-700 truncate max-w-[120px] md:max-w-none">{group.name}</p>
                        <p className="text-[10px] md:text-xs text-gray-500">{group.members} members</p>
                      </div>
                    </div>
                    {group.active && (
                      <span className="text-[10px] md:text-xs text-purple-600 font-medium">Active</span>
                    )}
                  </div>
                ))}
              </div>

              <button className="mt-3 md:mt-4 w-full px-3 md:px-4 py-1.5 md:py-2 bg-purple-50 text-purple-700 rounded-lg text-xs md:text-sm font-medium hover:bg-purple-100 transition-colors">
                Find More Groups
              </button>
            </Card>

            <Card className="p-4 md:p-6 border border-gray-100 bg-gradient-to-br from-purple-50 to-white">
              <h3 className="text-sm md:text-base font-semibold text-purple-900 mb-1 md:mb-2">Export Your Data</h3>
              <p className="text-[10px] md:text-xs text-purple-700 mb-3 md:mb-4">Download your study history</p>
              <Button
                variant="secondary"
                className="w-full bg-white hover:bg-gray-50 flex items-center justify-center gap-1 md:gap-2 text-xs md:text-sm py-1.5 md:py-2"
              >
                <Download size={14} className="md:w-4 md:h-4" />
                Download Report
              </Button>
            </Card>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal - Mobile optimized */}
      <Modal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        title="Edit Profile"
        size="lg"
        footer={
          <div className="flex justify-end gap-2 md:gap-3">
            <Button variant="secondary" onClick={() => setIsEditing(false)} size="sm" className="text-xs md:text-sm">
              Cancel
            </Button>
            <Button 
              variant="primary" 
              className="bg-purple-600 hover:bg-purple-700 flex items-center gap-1 md:gap-2 text-xs md:text-sm"
              onClick={handleSaveProfile}
            >
              <Save size={14} className="md:w-4 md:h-4" />
              Save Changes
            </Button>
          </div>
        }
      >
        <div className="space-y-4 md:space-y-6 max-h-[60vh] md:max-h-[70vh] overflow-y-auto px-1">
          <div>
            <h4 className="text-xs md:text-sm font-medium text-gray-700 mb-2 md:mb-3">Basic Information</h4>
            <div className="space-y-3 md:space-y-4">
              <Input
                label="Full Name"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                placeholder="Your name"
                icon={<User size={14} className="md:w-4 md:h-4 text-gray-400" />}
                className="text-sm"
              />
              
              <Input
                label="Current Role"
                value={editForm.currentRole}
                onChange={(e) => setEditForm({ ...editForm, currentRole: e.target.value })}
                placeholder="e.g., Software Engineer"
                icon={<Star size={14} className="md:w-4 md:h-4 text-gray-400" />}
                className="text-sm"
              />
              
              <Input
                label="Location"
                value={editForm.location}
                onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                placeholder="City, Country"
                icon={<Pin size={14} className="md:w-4 md:h-4 text-gray-400" />}
                className="text-sm"
              />
              
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">Bio</label>
                <textarea
                  value={editForm.bio}
                  onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                  rows={3}
                  placeholder="Tell us about yourself..."
                  className="w-full text-sm rounded-xl border border-gray-200 bg-white px-3 md:px-4 py-2 md:py-3 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                />
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs md:text-sm font-medium text-gray-700 mb-2 md:mb-3">Contact</h4>
            <div className="space-y-3 md:space-y-4">
              <Input
                label="Phone"
                value={editForm.phone}
                onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                placeholder="+1 (555) 000-0000"
                icon={<Phone size={14} className="md:w-4 md:h-4 text-gray-400" />}
                className="text-sm"
              />
            </div>
          </div>

          <div>
            <h4 className="text-xs md:text-sm font-medium text-gray-700 mb-2 md:mb-3">Social Links</h4>
            <div className="space-y-3 md:space-y-4">
              <Input
                label="Website"
                value={editForm.website}
                onChange={(e) => setEditForm({ ...editForm, website: e.target.value })}
                placeholder="https://yourwebsite.com"
                icon={<Globe size={14} className="md:w-4 md:h-4 text-gray-400" />}
                className="text-sm"
              />
              
              <Input
                label="GitHub"
                value={editForm.github}
                onChange={(e) => setEditForm({ ...editForm, github: e.target.value })}
                placeholder="https://github.com/username"
                icon={<GithubIcon size={14} className="md:w-4 md:h-4 text-gray-400" />}
                className="text-sm"
              />
              
              <Input
                label="LinkedIn"
                value={editForm.linkedin}
                onChange={(e) => setEditForm({ ...editForm, linkedin: e.target.value })}
                placeholder="https://linkedin.com/in/username"
                icon={<LinkedinIcon size={14} className="md:w-4 md:h-4 text-gray-400" />}
                className="text-sm"
              />
              
              <Input
                label="Twitter"
                value={editForm.twitter}
                onChange={(e) => setEditForm({ ...editForm, twitter: e.target.value })}
                placeholder="https://twitter.com/username"
                icon={<TwitterIcon size={14} className="md:w-4 md:h-4 text-gray-400" />}
                className="text-sm"
              />
            </div>
          </div>
        </div>
      </Modal>

      {/* Password Modal - Mobile optimized */}
      <Modal
        isOpen={showPasswordModal}
        onClose={() => {
          setShowPasswordModal(false);
          setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
          setFormErrors({});
        }}
        title="Change Password"
        size="sm"
        footer={
          <div className="flex justify-end gap-2 md:gap-3">
            <Button variant="secondary" onClick={() => setShowPasswordModal(false)} size="sm" className="text-xs md:text-sm">
              Cancel
            </Button>
            <Button 
              variant="primary" 
              className="bg-purple-600 hover:bg-purple-700 text-xs md:text-sm"
              onClick={handlePasswordChange}
            >
              Update Password
            </Button>
          </div>
        }
      >
        <div className="space-y-3 md:space-y-4">
          <Input
            label="Current Password"
            type="password"
            value={passwordForm.currentPassword}
            onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
            error={formErrors.currentPassword}
            className="text-sm"
          />
          
          <Input
            label="New Password"
            type="password"
            value={passwordForm.newPassword}
            onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
            error={formErrors.newPassword}
            helpText="Minimum 6 characters"
            className="text-sm"
          />
          
          <Input
            label="Confirm New Password"
            type="password"
            value={passwordForm.confirmPassword}
            onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
            error={formErrors.confirmPassword}
            className="text-sm"
          />
        </div>
      </Modal>

      {/* Email Modal - Mobile optimized */}
      <Modal
        isOpen={showEmailModal}
        onClose={() => {
          setShowEmailModal(false);
          setEmailForm({ newEmail: '', password: '' });
          setFormErrors({});
        }}
        title="Change Email"
        size="sm"
        footer={
          <div className="flex justify-end gap-2 md:gap-3">
            <Button variant="secondary" onClick={() => setShowEmailModal(false)} size="sm" className="text-xs md:text-sm">
              Cancel
            </Button>
            <Button 
              variant="primary" 
              className="bg-purple-600 hover:bg-purple-700 text-xs md:text-sm"
              onClick={handleEmailChange}
            >
              Update Email
            </Button>
          </div>
        }
      >
        <div className="space-y-3 md:space-y-4">
          <Input
            label="New Email"
            type="email"
            value={emailForm.newEmail}
            onChange={(e) => setEmailForm({ ...emailForm, newEmail: e.target.value })}
            error={formErrors.newEmail}
            className="text-sm"
          />
          
          <Input
            label="Password"
            type="password"
            value={emailForm.password}
            onChange={(e) => setEmailForm({ ...emailForm, password: e.target.value })}
            error={formErrors.password}
            helpText="Enter your password to confirm"
            className="text-sm"
          />
        </div>
      </Modal>

      {/* Delete Confirmation Modal - Mobile optimized */}
      <Modal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        title="Delete Account"
        size="sm"
        footer={
          <div className="flex justify-end gap-2 md:gap-3">
            <Button variant="secondary" onClick={() => setShowDeleteConfirm(false)} size="sm" className="text-xs md:text-sm">
              Cancel
            </Button>
            <Button 
              variant="danger" 
              className="bg-red-600 hover:bg-red-700 flex items-center gap-1 md:gap-2 text-xs md:text-sm"
              onClick={() => {
                // Handle account deletion
                setShowDeleteConfirm(false);
              }}
            >
              <TrashCan size={14} className="md:w-4 md:h-4" />
              Delete
            </Button>
          </div>
        }
      >
        <div className="text-center py-3 md:py-4">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
            <Warning size={20} className="md:w-8 md:h-8 text-red-600" />
          </div>
          <p className="text-sm md:text-base text-gray-900 font-medium mb-1 md:mb-2">Are you sure?</p>
          <p className="text-xs md:text-sm text-gray-500">
            This action cannot be undone.
          </p>
        </div>
      </Modal>
    </div>
  );
}