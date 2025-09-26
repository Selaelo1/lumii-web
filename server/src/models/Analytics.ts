export interface Analytics {
  id: string;
  userId: string;
  certificationId: string;
  date: Date;
  studyHours: number;
  practiceTests: number;
  averageScore: number;
  createdAt: Date;
}

// Mock analytics data
export const analytics: Analytics[] = [
  {
    id: 'analytics_1',
    userId: 'user_1',
    certificationId: 'cert_1',
    date: new Date('2024-01-20'),
    studyHours: 3.5,
    practiceTests: 2,
    averageScore: 85,
    createdAt: new Date('2024-01-20')
  },
  {
    id: 'analytics_2',
    userId: 'user_1',
    certificationId: 'cert_1',
    date: new Date('2024-01-19'),
    studyHours: 2.0,
    practiceTests: 1,
    averageScore: 89,
    createdAt: new Date('2024-01-19')
  },
  {
    id: 'analytics_3',
    userId: 'user_1',
    certificationId: 'cert_3',
    date: new Date('2024-01-18'),
    studyHours: 4.0,
    practiceTests: 3,
    averageScore: 72,
    createdAt: new Date('2024-01-18')
  },
  {
    id: 'analytics_4',
    userId: 'user_1',
    certificationId: 'cert_1',
    date: new Date('2024-01-17'),
    studyHours: 2.5,
    practiceTests: 1,
    averageScore: 91,
    createdAt: new Date('2024-01-17')
  },
  {
    id: 'analytics_5',
    userId: 'user_1',
    certificationId: 'cert_4',
    date: new Date('2024-01-16'),
    studyHours: 1.5,
    practiceTests: 1,
    averageScore: 68,
    createdAt: new Date('2024-01-16')
  }
];