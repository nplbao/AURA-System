import { Layout } from '../components/Layout';
import './Dashboard.css';

export const AdminAnalytics = () => {
  const mockAnalytics = {
    imageCount: 15678,
    riskDistribution: {
      low: 65,
      medium: 22,
      high: 10,
      critical: 3,
    },
    errorRate: 2.5,
    avgProcessingTime: '3.2 seconds',
    dailyUsage: [
      { date: '2024-01-10', count: 450 },
      { date: '2024-01-11', count: 520 },
      { date: '2024-01-12', count: 480 },
      { date: '2024-01-13', count: 610 },
      { date: '2024-01-14', count: 580 },
    ],
  };

  return (
    <Layout>
      <div className="dashboard">
        <h1>System Analytics</h1>

        <div className="analytics-grid">
          <div className="analytics-card">
            <h3>Total Images Analyzed</h3>
            <p className="analytics-value">{mockAnalytics.imageCount.toLocaleString()}</p>
          </div>
          <div className="analytics-card">
            <h3>Error Rate</h3>
            <p className="analytics-value">{mockAnalytics.errorRate}%</p>
          </div>
          <div className="analytics-card">
            <h3>Avg Processing Time</h3>
            <p className="analytics-value">{mockAnalytics.avgProcessingTime}</p>
          </div>
        </div>

        <div className="dashboard-section">
          <h2>Risk Distribution</h2>
          <div className="distribution-chart">
            {Object.entries(mockAnalytics.riskDistribution).map(([level, percentage]) => (
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
          <h2>Daily Usage Trend</h2>
          <div className="usage-chart">
            {mockAnalytics.dailyUsage.map((day) => (
              <div key={day.date} className="usage-bar-container">
                <div
                  className="usage-bar"
                  style={{ height: `${(day.count / 700) * 100}%` }}
                />
                <span className="usage-label">{day.date.split('-')[2]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};
