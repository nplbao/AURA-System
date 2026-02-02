import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Unauthorized } from './pages/Unauthorized';
import { UserDashboard } from './pages/UserDashboard';
import { UserUpload } from './pages/UserUpload';
import { UserResults } from './pages/UserResults';
import { UserHistory } from './pages/UserHistory';
import { UserProfile } from './pages/UserProfile';
import { UserPackages } from './pages/UserPackages';
import { UserMessages } from './pages/UserMessages';
import { DoctorDashboard } from './pages/DoctorDashboard';
import { DoctorPatients } from './pages/DoctorPatients';
import { DoctorReviews } from './pages/DoctorReviews';
import { DoctorStatistics } from './pages/DoctorStatistics';
import { ClinicDashboard } from './pages/ClinicDashboard';
import { ClinicBulkUpload } from './pages/ClinicBulkUpload';
import { ClinicReports } from './pages/ClinicReports';
import { ClinicAlerts } from './pages/ClinicAlerts';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminUsers } from './pages/AdminUsers';
import { AdminAIConfig } from './pages/AdminAIConfig';
import { AdminAnalytics } from './pages/AdminAnalytics';
import { AdminPackages } from './pages/AdminPackages';
import { AdminCompliance } from './pages/AdminCompliance';
import { ClinicDoctors } from './pages/ClinicDoctors';
import { AdminClinics } from './pages/AdminClinics';
import './App.css';

function App() {
  const { isAuthenticated, user } = useAuth();

  const getDefaultDashboard = () => {
    if (!user) return '/login';
    switch (user.role) {
      case 'user':
        return '/dashboard';
      case 'doctor':
        return '/dashboard';
      case 'clinic':
        return '/dashboard';
      case 'admin':
        return '/dashboard';
      default:
        return '/login';
    }
  };

  return (
    <Routes>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to={getDefaultDashboard()} replace /> : <Login />}
      />
      <Route
        path="/register"
        element={isAuthenticated ? <Navigate to={getDefaultDashboard()} replace /> : <Register />}
      />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* User Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={['user', 'doctor', 'clinic', 'admin']}>
            {user?.role === 'user' && <UserDashboard />}
            {user?.role === 'doctor' && <DoctorDashboard />}
            {user?.role === 'clinic' && <ClinicDashboard />}
            {user?.role === 'admin' && <AdminDashboard />}
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/upload"
        element={
          <ProtectedRoute allowedRoles={['user']}>
            <UserUpload />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/results"
        element={
          <ProtectedRoute allowedRoles={['user']}>
            <UserResults />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/history"
        element={
          <ProtectedRoute allowedRoles={['user']}>
            <UserHistory />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/profile"
        element={
          <ProtectedRoute allowedRoles={['user']}>
            <UserProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/packages"
        element={
          <ProtectedRoute allowedRoles={['user', 'clinic', 'admin']}>
            {user?.role === 'user' && <UserPackages />}
            {user?.role === 'clinic' && <UserPackages />}
            {user?.role === 'admin' && <AdminPackages />}
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/messages"
        element={
          <ProtectedRoute allowedRoles={['user', 'doctor']}>
            <UserMessages />
          </ProtectedRoute>
        }
      />

      {/* Doctor Routes */}
      <Route
        path="/dashboard/patients"
        element={
          <ProtectedRoute allowedRoles={['doctor', 'clinic']}>
            {user?.role === 'doctor' && <DoctorPatients />}
            {user?.role === 'clinic' && <DoctorPatients />}
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/reviews"
        element={
          <ProtectedRoute allowedRoles={['doctor']}>
            <DoctorReviews />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/statistics"
        element={
          <ProtectedRoute allowedRoles={['doctor']}>
            <DoctorStatistics />
          </ProtectedRoute>
        }
      />

      {/* Clinic Routes */}
      <Route
        path="/dashboard/bulk-upload"
        element={
          <ProtectedRoute allowedRoles={['clinic']}>
            <ClinicBulkUpload />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/reports"
        element={
          <ProtectedRoute allowedRoles={['clinic']}>
            <ClinicReports />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/alerts"
        element={
          <ProtectedRoute allowedRoles={['clinic']}>
            <ClinicAlerts />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/doctors"
        element={
          <ProtectedRoute allowedRoles={['clinic', 'admin']}>
            {user?.role === 'clinic' && <ClinicDoctors />}
            {user?.role === 'admin' && <div>Admin Doctors Management</div>}
          </ProtectedRoute>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/dashboard/users"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminUsers />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/clinics"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminClinics />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/ai-config"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminAIConfig />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/analytics"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminAnalytics />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/compliance"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminCompliance />
          </ProtectedRoute>
        }
      />

      <Route path="/" element={<Navigate to={isAuthenticated ? getDefaultDashboard() : '/login'} replace />} />
    </Routes>
  );
}

export default App;
