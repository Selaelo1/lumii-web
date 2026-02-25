// components/auth/ProfileGuard.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface ProfileGuardProps {
  children: React.ReactNode;
}

const ProfileGuard: React.FC<ProfileGuardProps> = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user has completed profile setup
    // You can add a flag in your user document like `isProfileComplete`
    const checkProfile = async () => {
      if (user && !user.isProfileComplete) {
        navigate('/profile/setup');
      }
    };

    checkProfile();
  }, [user, navigate]);

  return <>{children}</>;
};

export default ProfileGuard;