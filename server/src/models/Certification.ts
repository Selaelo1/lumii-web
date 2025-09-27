export interface Certification {
  id: string;
  userId: string;
  title: string;
  provider: string;
  progress: number; // 0-100
  status: 'in-progress' | 'completed' | 'scheduled';
  targetDate?: Date;
  examDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Mock certifications data
export const certifications: Certification[] = [
  {
    id: 'cert_1',
    userId: 'user_1',
    title: 'AWS Solutions Architect - Associate',
    provider: 'Amazon Web Services',
    progress: 87,
    status: 'in-progress',
    targetDate: new Date('2024-03-15'),
    examDate: new Date('2024-03-15'),
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: 'cert_2',
    userId: 'user_1',
    title: 'CompTIA Security+',
    provider: 'CompTIA',
    progress: 100,
    status: 'completed',
    examDate: new Date('2024-01-15'),
    createdAt: new Date('2023-12-01'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 'cert_3',
    userId: 'user_1',
    title: 'Azure Fundamentals',
    provider: 'Microsoft',
    progress: 45,
    status: 'scheduled',
    targetDate: new Date('2024-04-02'),
    examDate: new Date('2024-04-02'),
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-18')
  },
  {
    id: 'cert_4',
    userId: 'user_1',
    title: 'Google Cloud Professional Cloud Architect',
    provider: 'Google Cloud',
    progress: 23,
    status: 'in-progress',
    targetDate: new Date('2024-05-20'),
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-22')
  }
];