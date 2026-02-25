// pages/Signup.tsx
import React from 'react';
import SignupForm from '../components/auth/SignupForm';

const Signup: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Start your journey 🚀</h1>
          <p className="text-gray-600">Create an account and start tracking your certifications</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <SignupForm />
        </div>
      </div>
    </div>
  );
};

export default Signup;