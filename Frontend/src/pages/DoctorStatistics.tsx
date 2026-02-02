import { Layout } from '../components/Layout';
import './Dashboard.css';

export const DoctorStatistics = () => {
  const mockStats = {
    totalAnalyses: 234,
    avgRiskDistribution: { low: 60, medium: 25, high: 12, critical: 3 },
    accuracyRate: 94.5,
    avgReviewTime: '15 minutes',
  };

  return (
    <Layout>
      <div className="dashboard">
        <h1>Performance Statistics</h1>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Analyses Reviewed</h3>
            <p className="stat-value">{mockStats.totalAnalyses}</p>
          </div>
          <div className="stat-card">
            <h3>AI Accuracy Rate</h3>
            <p className="stat-value">{mockStats.accuracyRate}%</p>
          </div>
          <div className="stat-card">
            <h3>Average Review Time</h3>
            <p className="stat-value">{mockStats.avgReviewTime}</p>
          </div>
        </div>

        <div className="dashboard-section">
          <h2>Risk Level Distribution</h2>
          <div className="distribution-chart">
            {Object.entries(mockStats.avgRiskDistribution).map(([level, percentage]) => (
              <div key={level} className="distribution-bar">
                <div className="bar-label">
                  <span>{level.toUpperCase()}</span>
                  <span>{percentage}%</span>
                </div>
                <div className="bar-container">
                  <div
                    className={`bar ${level}-risk`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-section">
          <h2>Recent Activity</h2>
          <div className="activity-list">
            <div className="activity-item">
              <span>Reviewed analysis for Patient #123</span>
              <span className="activity-time">2 hours ago</span>
            </div>
            <div className="activity-item">
              <span>Validated AI findings for Patient #122</span>
              <span className="activity-time">5 hours ago</span>
            </div>
            <div className="activity-item">
              <span>Added notes for Patient #121</span>
              <span className="activity-time">1 day ago</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
