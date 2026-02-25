// components/auth/SignupForm.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { User, Email, Password } from '@carbon/icons-react';

const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      await signup(formData.name, formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setErrors({ form: 'Signup failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.form && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
          {errors.form}
        </div>
      )}

      <Input
        label="Full Name"
        type="text"
        placeholder="Alex Chen"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        icon={<User size={18} />}
        error={errors.name}
        required
      />

      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        icon={<Email size={18} />}
        error={errors.email}
        required
      />

      <Input
        label="Password"
        type="password"
        placeholder="••••••••"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        icon={<Password size={18} />}
        error={errors.password}
        required
      />

      <Input
        label="Confirm Password"
        type="password"
        placeholder="••••••••"
        value={formData.confirmPassword}
        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
        icon={<Password size={18} />}
        error={errors.confirmPassword}
        required
      />

      <div className="flex items-center space-x-2">
        <input 
          type="checkbox" 
          id="terms" 
          className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
          required
        />
        <label htmlFor="terms" className="text-sm text-gray-600">
          I agree to the{' '}
          <a href="#" className="text-purple-600 hover:text-purple-700">Terms of Service</a>
          {' '}and{' '}
          <a href="#" className="text-purple-600 hover:text-purple-700">Privacy Policy</a>
        </label>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full bg-purple-600 hover:bg-purple-700"
        disabled={isLoading}
      >
        {isLoading ? 'Creating account...' : 'Create account'}
      </Button>

      <p className="text-center text-sm text-gray-600">
        Already have an account?{' '}
        <a href="/login" className="text-purple-600 hover:text-purple-700 font-medium">
          Log in
        </a>
      </p>
    </form>
  );
};

export default SignupForm;