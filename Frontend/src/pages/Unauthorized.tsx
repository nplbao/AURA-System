import { Link } from 'react-router-dom';
import './Auth.css';

export const Unauthorized = () => {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Unauthorized Access</h1>
        <p>You don't have permission to access this page.</p>
        <Link to="/dashboard" className="btn-primary" style={{ display: 'inline-block', marginTop: '1rem' }}>
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};
