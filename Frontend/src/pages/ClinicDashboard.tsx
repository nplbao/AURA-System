import { Layout } from '../components/Layout';
import './Dashboard.css';

export const ClinicDashboard = () => {
  const mockStats = {
    totalDoctors: 8,
    totalPatients: 156,
    imagesAnalyzed: 1243,
    remainingCredits: 250,
    highRiskPatients: 12,
  };

  return (
    <Layout>
      <div className="dashboard">
        <h1>Clinic Dashboard</h1>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Doctors</h3>
            <p className="stat-value">{mockStats.totalDoctors}</p>
          </div>
          <div className="stat-card">
            <h3>Total Patients</h3>
            <p className="stat-value">{mockStats.totalPatients}</p>
          </div>
          <div className="stat-card">
            <h3>Images Analyzed</h3>
            <p className="stat-value">{mockStats.imagesAnalyzed}</p>
          </div>
          <div className="stat-card">
            <h3>Remaining Credits</h3>
            <p className="stat-value">{mockStats.remainingCredits}</p>
          </div>
          <div className="stat-card warning">
            <h3>High Risk Patients</h3>
            <p className="stat-value">{mockStats.highRiskPatients}</p>
          </div>
        </div>

        <div className="dashboard-section">
          <h2>Recent Alerts</h2>
          <div className="alerts-list">
            <div className="alert-item high-risk">
              <h4>High Risk Patient Detected</h4>
              <p>Patient John Doe - Analysis #1234 shows critical findings</p>
              <span className="alert-time">2 hours ago</span>
            </div>
            <div className="alert-item medium-risk">
              <h4>Bulk Upload Completed</h4>
              <p>50 images successfully analyzed</p>
              <span className="alert-time">1 day ago</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
