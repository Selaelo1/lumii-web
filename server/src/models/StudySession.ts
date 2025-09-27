export interface StudySession {
  id: string;
  userId: string;
  certificationId: string;
  title: string;
  scheduledDate: Date;
  duration: number; // in minutes
  status: 'scheduled' | 'completed' | 'cancelled' | 'in-progress';
  notes?: string;
  actualDuration?: number;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Mock study sessions data
export const studySessions: StudySession[] = [
  {
    id: 'session_1',
    userId: 'user_1',
    certificationId: 'cert_1',
    title: 'AWS Practice Test',
    scheduledDate: new Date(new Date().setHours(14, 0, 0, 0)), // Today at 2:00 PM
    duration: 60,
    status: 'scheduled',
    notes: 'Focus on VPC and networking concepts',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: 'session_2',
    userId: 'user_1',
    certificationId: 'cert_1',
    title: 'Security+ Review',
    scheduledDate: new Date(new Date().setHours(16, 0, 0, 0)), // Today at 4:00 PM
    duration: 90,
    status: 'scheduled',
    notes: 'Review cryptography and risk management',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: 'session_3',
    userId: 'user_1',
    certificationId: 'cert_3',
    title: 'Azure Fundamentals Study',
    scheduledDate: new Date(new Date().setDate(new Date().getDate() + 1)), // Tomorrow
    duration: 120,
    status: 'scheduled',
    notes: 'Core Azure services overview',
    createdAt: new Date('2024-01-19'),
    updatedAt: new Date('2024-01-19')
  },
  {
    id: 'session_4',
    userId: 'user_1',
    certificationId: 'cert_1',
    title: 'AWS Lambda Deep Dive',
    scheduledDate: new Date('2024-01-19'),
    duration: 75,
    status: 'completed',
    actualDuration: 80,
    completedAt: new Date('2024-01-19'),
    notes: 'Serverless architecture patterns',
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-19')
  }
];