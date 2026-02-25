// App.tsx
import { BrowserRouter, Routes, Route, Navigate, useNavigate} from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Certificates from './pages/Certificates';
import Tracker from './pages/Tracker';
import StudyTools from './pages/StudyTools';
import Groups from './pages/Groups';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProfileSetup from './pages/ProfileSetup';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { useEffect } from 'react';


// Component to handle profile completion check
const ProfileCheck: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && user && !user.isProfileComplete) {
      // User is logged in but profile is not complete, redirect to setup
      navigate('/profile/setup');
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

const AppRoutes = () => {
  useAuth();

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={
        <Layout>
          <Home />
        </Layout>
      } />
      <Route path="/login" element={
        <Layout>
          <Login />
        </Layout>
      } />
      <Route path="/signup" element={
        <Layout>
          <Signup />
        </Layout>
      } />

      {/* Profile Setup - Accessible only when logged in but profile incomplete */}
      <Route path="/profile/setup" element={
        <ProtectedRoute>
          <Layout>
            <ProfileSetup />
          </Layout>
        </ProtectedRoute>
      } />

      {/* Protected routes - with profile check */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <ProfileCheck>
            <Layout showSidebar={true}>
              <Dashboard />
            </Layout>
          </ProfileCheck>
        </ProtectedRoute>
      } />
      
      <Route path="/certificates" element={
        <ProtectedRoute>
          <ProfileCheck>
            <Layout showSidebar={true}>
              <Certificates />
            </Layout>
          </ProfileCheck>
        </ProtectedRoute>
      } />
      
      <Route path="/certificates/add" element={
        <ProtectedRoute>
          <ProfileCheck>
            <Layout showSidebar={true}>
              {/* You'll need to create this component */}
              <div>Add Certificate Page</div>
            </Layout>
          </ProfileCheck>
        </ProtectedRoute>
      } />
      
      <Route path="/tracker" element={
        <ProtectedRoute>
          <ProfileCheck>
            <Layout showSidebar={true}>
              <Tracker />
            </Layout>
          </ProfileCheck>
        </ProtectedRoute>
      } />
      
      <Route path="/study-tools" element={
        <ProtectedRoute>
          <ProfileCheck>
            <Layout showSidebar={true}>
              <StudyTools />
            </Layout>
          </ProfileCheck>
        </ProtectedRoute>
      } />
      
      <Route path="/groups" element={
        <ProtectedRoute>
          <ProfileCheck>
            <Layout showSidebar={true}>
              <Groups />
            </Layout>
          </ProfileCheck>
        </ProtectedRoute>
      } />
      
      <Route path="/profile" element={
        <ProtectedRoute>
          <ProfileCheck>
            <Layout showSidebar={true}>
              <Profile />
            </Layout>
          </ProfileCheck>
        </ProtectedRoute>
      } />

      {/* Catch all - redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;