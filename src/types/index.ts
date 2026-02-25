// types/index.ts

// User related types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  streak: number;
  longestStreak: number;
  totalStudyDays: number;
  joinDate: Date;
  weeklyGoal?: number; // in minutes
}

// Certificate related types
export interface Certificate {
  id: string;
  name: string;
  provider: 'coursera' | 'udemy' | 'edx' | 'pluralsight' | 'linkedin-learning' | 'aws' | 'google' | 'microsoft' | 'other';
  providerUrl?: string;
  progress: number; // 0-100
  startDate: Date;
  targetDate?: Date;
  examDate?: Date;
  status: 'not-started' | 'in-progress' | 'completed' | 'exam-ready';
  totalHours: number;
  completedHours: number;
  logo?: string;
  certificateUrl?: string;
  grade?: string;
  notes?: string;
  skills?: string[];
}

// Study session types
export interface StudySession {
  id: string;
  certificateId: string;
  userId: string;
  date: Date;
  duration: number; // in minutes
  technique: 'pomodoro' | 'focused' | 'review' | 'mock-exam' | 'quick-session';
  notes?: string;
  topics?: string[];
  productivity?: 1 | 2 | 3 | 4 | 5; // self-rated productivity
}

// Tracker types (GitHub-style)
export interface TrackerDay {
  date: string; // ISO date string
  count: number; // minutes studied
  intensity: 0 | 1 | 2 | 3 | 4; // 0-4 for GitHub-style coloring
  sessions: number; // number of study sessions
}

export interface TrackerWeek {
  days: TrackerDay[];
  weekNumber: number;
  year: number;
  totalMinutes: number;
}

export interface TrackerData {
  userId: string;
  weeks: TrackerWeek[];
  totalMinutes: number;
  currentStreak: number;
  longestStreak: number;
}

// Study goals
export interface StudyGoal {
  id: string;
  certificateId: string;
  userId: string;
  dailyTarget: number; // minutes
  weeklyTarget: number; // minutes
  monthlyTarget?: number;
  examDate?: Date;
  reminders: boolean;
  reminderTime?: string; // 24hr format "09:00"
  createdAt: Date;
  updatedAt: Date;
}

// Study groups (future feature)
export interface StudyGroup {
  id: string;
  name: string;
  description: string;
  coverImage?: string;
  members: StudyGroupMember[];
  certificates: string[]; // certificate IDs being studied
  createdAt: Date;
  createdBy: string; // user ID
  isPrivate: boolean;
  rules?: string[];
}

export interface StudyGroupMember {
  userId: string;
  role: 'admin' | 'moderator' | 'member';
  joinedAt: Date;
  studyStreak?: number;
  weeklyContribution?: number;
}

// Mock exam types
export interface MockExam {
  id: string;
  certificateId: string;
  title: string;
  duration: number; // in minutes
  totalQuestions: number;
  passingScore: number;
  questions: ExamQuestion[];
  attempts: ExamAttempt[];
}

export interface ExamQuestion {
  id: string;
  text: string;
  options: string[];
  correctOption: number; // index of correct answer
  explanation?: string;
  topic?: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface ExamAttempt {
  id: string;
  userId: string;
  examId: string;
  startedAt: Date;
  completedAt?: Date;
  score?: number;
  answers: number[]; // selected option indices
  timeSpent: number; // in minutes
  passed: boolean;
}

// Timer/Pomodoro types
export interface TimerSettings {
  workDuration: number; // in minutes
  shortBreakDuration: number;
  longBreakDuration: number;
  longBreakInterval: number; // after how many pomodoros
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
  soundEnabled: boolean;
  notificationEnabled: boolean;
}

export interface TimerSession {
  id: string;
  userId: string;
  type: 'work' | 'shortBreak' | 'longBreak';
  startedAt: Date;
  endedAt?: Date;
  completed: boolean;
  certificateId?: string;
  notes?: string;
}

// Notification types
export interface Notification {
  id: string;
  userId: string;
  type: 'reminder' | 'achievement' | 'group-invite' | 'exam-reminder' | 'streak-warning';
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  link?: string;
  data?: Record<string, any>;
}

// Achievement/Badge types
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'streak' | 'hours' | 'certificates' | 'exams' | 'social';
  requirement: number;
  unlockedAt?: Date;
}

export interface UserAchievement {
  userId: string;
  achievementId: string;
  progress: number;
  unlockedAt?: Date;
}

// API Response types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
  status: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Dashboard summary types
export interface DashboardSummary {
  user: User;
  certificates: {
    total: number;
    completed: number;
    inProgress: number;
    examReady: number;
    overallProgress: number;
  };
  studyStats: {
    totalHours: number;
    currentStreak: number;
    longestStreak: number;
    weeklyAverage: number;
    todayMinutes: number;
  };
  recentSessions: StudySession[];
  upcomingExams: Certificate[];
  achievements: Achievement[];
}

// Form types
export interface AddCertificateFormData {
  name: string;
  provider: Certificate['provider'];
  providerUrl?: string;
  totalHours: number;
  startDate: Date;
  targetDate?: Date;
  examDate?: Date;
  notes?: string;
  certificateUrl?: string;
}

export interface StudySessionFormData {
  certificateId: string;
  duration: number;
  technique: StudySession['technique'];
  notes?: string;
  topics?: string[];
  productivity?: 1 | 2 | 3 | 4 | 5;
}

// Filter types
export interface CertificateFilters {
  status?: Certificate['status'][];
  provider?: Certificate['provider'][];
  search?: string;
  sortBy?: 'name' | 'progress' | 'startDate' | 'examDate';
  sortOrder?: 'asc' | 'desc';
}

export interface StudySessionFilters {
  certificateId?: string;
  technique?: StudySession['technique'][];
  startDate?: Date;
  endDate?: Date;
  minDuration?: number;
}