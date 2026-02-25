// services/auth.ts
import { api } from './api';
import { User } from '../types';

class AuthService {
  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    const response = await api.post<{ user: User; token: string }>('/auth/login', {
      email,
      password
    });
    
    localStorage.setItem('lumii_token', response.token);
    return response;
  }

  async signup(name: string, email: string, password: string): Promise<{ user: User; token: string }> {
    const response = await api.post<{ user: User; token: string }>('/auth/signup', {
      name,
      email,
      password
    });
    
    localStorage.setItem('lumii_token', response.token);
    return response;
  }

  async logout(): Promise<void> {
    localStorage.removeItem('lumii_token');
    localStorage.removeItem('lumii_user');
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await api.get<{ user: User }>('/auth/me');
      return response.user;
    } catch {
      return null;
    }
  }
}

export const auth = new AuthService();