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
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import About from './pages/About';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Careers from './pages/Careers';
import Cookies from './pages/Cookies';
import Help from './pages/Help';
import Community from './pages/Community';
import Faqs from './pages/Faqs';
import Support from './pages/Support';
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

      {/* Public informational pages */}
      <Route path="/privacy" element={
        <Layout>
          <Privacy />
        </Layout>
      } />
      
      <Route path="/terms" element={
        <Layout>
          <Terms />
        </Layout>
      } />
      
      <Route path="/about" element={
        <Layout>
          <About />
        </Layout>
      } />
      
      <Route path="/blog" element={
        <Layout>
          <Blog />
        </Layout>
      } />
      
      <Route path="/contact" element={
        <Layout>
          <Contact />
        </Layout>
      } />

      {/* Additional public pages */}
      <Route path="/careers" element={
        <Layout>
          <Careers />
        </Layout>
      } />
      
      <Route path="/cookies" element={
        <Layout>
          <Cookies />
        </Layout>
      } />
      
      <Route path="/help" element={
        <Layout>
          <Help />
        </Layout>
      } />
      
      <Route path="/community" element={
        <Layout>
          <Community />
        </Layout>
      } />
      
      <Route path="/faqs" element={
        <Layout>
          <Faqs />
        </Layout>
      } />
      
      <Route path="/support" element={
        <Layout>
          <Support />
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
              <div className="p-8 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Add Certificate</h2>
                <p className="text-gray-600">This page is coming soon!</p>
              </div>
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