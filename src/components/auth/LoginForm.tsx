// components/auth/LoginForm.tsx
import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { User, Password } from '@carbon/icons-react';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, resetPassword } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [rememberMe, setRememberMe] = useState(false);

  const from = (location.state as any)?.from?.pathname || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      await login(formData.email, formData.password, rememberMe);
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      await resetPassword(resetEmail);
      setSuccessMessage('Password reset email sent! Check your inbox.');
      setTimeout(() => {
        setShowForgotPassword(false);
        setResetEmail('');
      }, 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to send reset email');
    } finally {
      setIsLoading(false);
    }
  };

  if (showForgotPassword) {
    return (
      <form onSubmit={handleForgotPassword} className="space-y-6">
        <div className="text-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Reset Password</h2>
          <p className="text-sm text-gray-600">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="bg-green-50 text-green-600 p-3 rounded-lg text-sm">
            {successMessage}
          </div>
        )}

        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={resetEmail}
          onChange={(e) => setResetEmail(e.target.value)}
          icon={<User size={18} />}
          required
        />

        <div className="flex space-x-3">
          <Button
            type="button"
            variant="secondary"
            size="lg"
            className="flex-1"
            onClick={() => {
              setShowForgotPassword(false);
              setError('');
              setSuccessMessage('');
              setResetEmail('');
            }}
          >
            Back
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="flex-1 bg-purple-600 hover:bg-purple-700"
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </Button>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        icon={<User size={18} />}
        required
      />

      <Input
        label="Password"
        type="password"
        placeholder="••••••••"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        icon={<Password size={18} />}
        required
      />

      <div className="flex items-center justify-between">
        <label className="flex items-center space-x-2">
          <input 
            type="checkbox" 
            className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <span className="text-sm text-gray-600">Remember me</span>
        </label>
        <button
          type="button"
          onClick={() => setShowForgotPassword(true)}
          className="text-sm text-purple-600 hover:text-purple-700"
        >
          Forgot password?
        </button>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full bg-purple-600 hover:bg-purple-700"
        disabled={isLoading}
      >
        {isLoading ? 'Logging in...' : 'Log in'}
      </Button>

      <p className="text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <Link to="/signup" className="text-purple-600 hover:text-purple-700 font-medium">
          Sign up
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;