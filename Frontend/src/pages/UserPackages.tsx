import { Layout } from '../components/Layout';
import './Dashboard.css';

export const UserPackages = () => {
  const mockPackages = [
    { id: '1', name: 'Basic', credits: 10, price: 29.99, duration: 30 },
    { id: '2', name: 'Standard', credits: 25, price: 59.99, duration: 30 },
    { id: '3', name: 'Premium', credits: 50, price: 99.99, duration: 30 },
  ];

  const mockPaymentHistory = [
    { id: '1', date: '2024-01-01', package: 'Standard', amount: 59.99, status: 'completed' },
    { id: '2', date: '2023-12-01', package: 'Basic', amount: 29.99, status: 'completed' },
  ];

  return (
    <Layout>
      <div className="dashboard">
        <h1>Service Packages</h1>

        <div className="packages-section">
          <h2>Available Packages</h2>
          <div className="packages-grid">
            {mockPackages.map((pkg) => (
              <div key={pkg.id} className="package-card">
                <h3>{pkg.name}</h3>
                <div className="package-price">${pkg.price}</div>
                <ul className="package-features">
                  <li>{pkg.credits} Image Credits</li>
                  <li>Valid for {pkg.duration} days</li>
                  <li>Email Support</li>
                </ul>
                <button className="btn-primary">Purchase</button>
              </div>
            ))}
          </div>
        </div>

        <div className="payment-history-section">
          <h2>Payment History</h2>
          <div className="history-table">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Package</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {mockPaymentHistory.map((payment) => (
                  <tr key={payment.id}>
                    <td>{payment.date}</td>
                    <td>{payment.package}</td>
                    <td>${payment.amount}</td>
                    <td>
                      <span className="status-badge completed">{payment.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="credits-section">
          <h2>Remaining Credits</h2>
          <div className="credits-display">
            <span className="credits-value">15</span>
            <span className="credits-label">Image Analyses Remaining</span>
          </div>
        </div>
      </div>
    </Layout>
  );
};
