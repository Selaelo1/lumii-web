// App.tsx

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
import ProtectedRoute from './components/auth/ProtectedRoute';
import Signup from './pages/Signup';

const AppRoutes = () => {
  const { user } = useAuth();

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

      {/* Protected routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Layout showSidebar={true}>
            <Dashboard />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/certificates" element={
        <ProtectedRoute>
          <Layout showSidebar={true}>
            <Certificates />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/tracker" element={
        <ProtectedRoute>
          <Layout showSidebar={true}>
            <Tracker />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/study-tools" element={
        <ProtectedRoute>
          <Layout showSidebar={true}>
            <StudyTools />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/groups" element={
        <ProtectedRoute>
          <Layout showSidebar={true}>
            <Groups />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/profile" element={
        <ProtectedRoute>
          <Layout showSidebar={true}>
            <Profile />
          </Layout>
        </ProtectedRoute>
      } />

      {/* Catch all */}
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