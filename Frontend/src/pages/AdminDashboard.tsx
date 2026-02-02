import { Layout } from '../components/Layout';
import './Dashboard.css';

export const AdminDashboard = () => {
  const mockStats = {
    totalUsers: 1245,
    totalDoctors: 89,
    totalClinics: 23,
    totalImages: 15678,
    revenue: 125430,
    aiAccuracy: 94.5,
  };

  return (
    <Layout>
      <div className="dashboard">
        <h1>Admin Dashboard</h1>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Users</h3>
            <p className="stat-value">{mockStats.totalUsers}</p>
          </div>
          <div className="stat-card">
            <h3>Total Doctors</h3>
            <p className="stat-value">{mockStats.totalDoctors}</p>
          </div>
          <div className="stat-card">
            <h3>Total Clinics</h3>
            <p className="stat-value">{mockStats.totalClinics}</p>
          </div>
          <div className="stat-card">
            <h3>Total Images Analyzed</h3>
            <p className="stat-value">{mockStats.totalImages.toLocaleString()}</p>
          </div>
          <div className="stat-card">
            <h3>Total Revenue</h3>
            <p className="stat-value">${mockStats.revenue.toLocaleString()}</p>
          </div>
          <div className="stat-card">
            <h3>AI Accuracy Rate</h3>
            <p className="stat-value">{mockStats.aiAccuracy}%</p>
          </div>
        </div>

        <div className="dashboard-section">
          <h2>System Overview</h2>
          <div className="overview-grid">
            <div className="overview-card">
              <h3>Risk Distribution</h3>
              <div className="distribution-mini">
                <div className="dist-item">
                  <span>Low: 65%</span>
                </div>
                <div className="dist-item">
                  <span>Medium: 22%</span>
                </div>
                <div className="dist-item">
                  <span>High: 10%</span>
                </div>
                <div className="dist-item">
                  <span>Critical: 3%</span>
                </div>
              </div>
            </div>
            <div className="overview-card">
              <h3>Recent Activity</h3>
              <div className="activity-list">
                <div className="activity-item">
                  <span>New clinic registered</span>
                  <span className="activity-time">1 hour ago</span>
                </div>
                <div className="activity-item">
                  <span>1000 images analyzed today</span>
                  <span className="activity-time">3 hours ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
