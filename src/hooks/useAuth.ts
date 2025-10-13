import { useState, useCallback } from 'react';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: false,
    error: null
  });

  const login = useCallback(async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      // TODO: Replace with actual API call
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      if (!response.ok) throw new Error('Login failed');
      
      const data = await response.json();
      setAuthState({ user: data.user, loading: false, error: null });
      
      // Store token
      localStorage.setItem('token', data.token);
      
      return data;
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Login failed'
      }));
      throw error;
    }
  }, []);

  const signup = useCallback(async (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      // TODO: Replace with actual API call
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      
      if (!response.ok) throw new Error('Signup failed');
      
      const data = await response.json();
      setAuthState({ user: data.user, loading: false, error: null });
      
      // Store token
      localStorage.setItem('token', data.token);
      
      return data;
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Signup failed'
      }));
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setAuthState({ user: null, loading: false, error: null });
  }, []);

  return {
    ...authState,
    login,
    signup,
    logout
  };
};