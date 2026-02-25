// utils/constants.ts
export const STUDY_TECHNIQUES = {
  POMODORO: 'pomodoro',
  FOCUSED: 'focused',
  MOCK_EXAM: 'mock-exam'
} as const;

export const CERTIFICATE_PROVIDERS = [
  'coursera',
  'udemy',
  'edx',
  'pluralsight',
  'linkedin-learning',
  'other'
] as const;

export const COLORS = {
  primary: {
    50: '#faf5ff',
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#c084fc',
    500: '#a855f7',
    600: '#9333ea',
    700: '#7e22ce',
    800: '#6b21a8',
    900: '#581c87'
  }
};

export const TRACKER_INTENSITY = {
  0: 'bg-gray-100',
  1: 'bg-purple-200',
  2: 'bg-purple-300',
  3: 'bg-purple-400',
  4: 'bg-purple-600'
} as const;