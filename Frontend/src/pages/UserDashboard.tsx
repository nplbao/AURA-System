import { Layout } from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import './Dashboard.css';

export const UserDashboard = () => {
  const { user } = useAuth();

  return (
    <Layout>
      <div className="dashboard">
        <h1>Welcome, {user?.name}</h1>
        
        <div className="dashboard-overview">
          <div className="stats-grid">
            <div className="stat-card">
              <h3>Remaining Credits</h3>
              <p className="stat-value">15</p>
            </div>
            <div className="stat-card">
              <h3>Total Analyses</h3>
              <p className="stat-value">42</p>
            </div>
            <div className="stat-card">
              <h3>High Risk Cases</h3>
              <p className="stat-value warning">3</p>
            </div>
            <div className="stat-card">
              <h3>Pending Results</h3>
              <p className="stat-value">2</p>
            </div>
          </div>

          <div className="dashboard-section">
            <h2>Recent Results</h2>
            <div className="results-list">
              <div className="result-item">
                <div className="result-info">
                  <h4>Analysis #1234</h4>
                  <p>Uploaded: 2 days ago</p>
                </div>
                <div className="result-status high-risk">High Risk</div>
                <button className="btn-view">View Details</button>
              </div>
              <div className="result-item">
                <div className="result-info">
                  <h4>Analysis #1233</h4>
                  <p>Uploaded: 5 days ago</p>
                </div>
                <div className="result-status low-risk">Low Risk</div>
                <button className="btn-view">View Details</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
