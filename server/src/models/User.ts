export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

// Mock users data
export const users: User[] = [
  {
    id: 'user_1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPdxPESRt.VmO', // 'password123'
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'user_2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@example.com',
    password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPdxPESRt.VmO', // 'password123'
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02')
  }
];