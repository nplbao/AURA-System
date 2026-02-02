import { Layout } from '../components/Layout';
import './Dashboard.css';

export const DoctorDashboard = () => {
  const mockStats = {
    totalPatients: 45,
    pendingReviews: 8,
    highRiskCases: 5,
    completedToday: 12,
  };

  const mockPendingReviews = [
    { id: '1', patientName: 'John Doe', riskLevel: 'high', uploadDate: '2024-01-15' },
    { id: '2', patientName: 'Jane Smith', riskLevel: 'medium', uploadDate: '2024-01-14' },
  ];

  return (
    <Layout>
      <div className="dashboard">
        <h1>Doctor Dashboard</h1>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Patients</h3>
            <p className="stat-value">{mockStats.totalPatients}</p>
          </div>
          <div className="stat-card">
            <h3>Pending Reviews</h3>
            <p className="stat-value warning">{mockStats.pendingReviews}</p>
          </div>
          <div className="stat-card">
            <h3>High Risk Cases</h3>
            <p className="stat-value warning">{mockStats.highRiskCases}</p>
          </div>
          <div className="stat-card">
            <h3>Completed Today</h3>
            <p className="stat-value">{mockStats.completedToday}</p>
          </div>
        </div>

        <div className="dashboard-section">
          <h2>Pending Reviews</h2>
          <div className="reviews-list">
            {mockPendingReviews.map((review) => (
              <div key={review.id} className="review-card">
                <div className="review-info">
                  <h4>{review.patientName}</h4>
                  <p>Uploaded: {review.uploadDate}</p>
                </div>
                <span className={`risk-badge ${review.riskLevel}-risk`}>
                  {review.riskLevel.toUpperCase()} RISK
                </span>
                <button className="btn-primary">Review</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};
