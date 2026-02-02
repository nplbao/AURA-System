import { type ReactNode } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Layout.css';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getNavLinks = () => {
    if (!user) return [];

    switch (user.role) {
      case 'user':
        return [
          { path: '/dashboard', label: 'Dashboard' },
          { path: '/dashboard/upload', label: 'Upload Images' },
          { path: '/dashboard/results', label: 'My Results' },
          { path: '/dashboard/history', label: 'History' },
          { path: '/dashboard/profile', label: 'Profile' },
          { path: '/dashboard/packages', label: 'Packages' },
          { path: '/dashboard/messages', label: 'Messages' },
        ];
      case 'doctor':
        return [
          { path: '/dashboard', label: 'Dashboard' },
          { path: '/dashboard/patients', label: 'Patients' },
          { path: '/dashboard/reviews', label: 'Reviews' },
          { path: '/dashboard/messages', label: 'Messages' },
          { path: '/dashboard/statistics', label: 'Statistics' },
        ];
      case 'clinic':
        return [
          { path: '/dashboard', label: 'Dashboard' },
          { path: '/dashboard/doctors', label: 'Doctors' },
          { path: '/dashboard/patients', label: 'Patients' },
          { path: '/dashboard/bulk-upload', label: 'Bulk Upload' },
          { path: '/dashboard/reports', label: 'Reports' },
          { path: '/dashboard/packages', label: 'Packages' },
          { path: '/dashboard/alerts', label: 'Alerts' },
        ];
      case 'admin':
        return [
          { path: '/dashboard', label: 'Dashboard' },
          { path: '/dashboard/users', label: 'Users' },
          { path: '/dashboard/doctors', label: 'Doctors' },
          { path: '/dashboard/clinics', label: 'Clinics' },
          { path: '/dashboard/packages', label: 'Packages' },
          { path: '/dashboard/ai-config', label: 'AI Config' },
          { path: '/dashboard/analytics', label: 'Analytics' },
          { path: '/dashboard/compliance', label: 'Compliance' },
        ];
      default:
        return [];
    }
  };

  return (
    <div className="layout">
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/dashboard" className="nav-logo">
            <svg className="eye-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
            <h2>AURA</h2>
          </Link>
          <div className="nav-links">
            {getNavLinks().map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={location.pathname === link.path ? 'nav-link active' : 'nav-link'}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="nav-user">
            <span className="user-name">{user?.name}</span>
            <span className="user-role">{user?.role}</span>
            <button onClick={handleLogout} className="btn-logout">
              Logout
            </button>
          </div>
        </div>
      </nav>
      <main className="main-content">{children}</main>
    </div>
  );
};
