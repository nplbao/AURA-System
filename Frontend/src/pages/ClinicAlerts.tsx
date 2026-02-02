import { Layout } from '../components/Layout';
import './Dashboard.css';

export const ClinicAlerts = () => {
  const mockAlerts = [
    {
      id: '1',
      type: 'high-risk',
      title: 'High Risk Patient Detected',
      patientName: 'John Doe',
      description: 'Analysis #1234 shows critical diabetic retinopathy findings',
      timestamp: '2024-01-15 14:30',
      read: false,
    },
    {
      id: '2',
      type: 'abnormal-trend',
      title: 'Abnormal Trend Detected',
      patientName: 'Jane Smith',
      description: 'Rapid progression detected in last 3 analyses',
      timestamp: '2024-01-15 10:15',
      read: false,
    },
    {
      id: '3',
      type: 'package-low',
      title: 'Low Package Credits',
      description: 'Remaining credits below 10% threshold',
      timestamp: '2024-01-14 16:00',
      read: true,
    },
  ];

  return (
    <Layout>
      <div className="dashboard">
        <h1>Alerts & Notifications</h1>

        <div className="alerts-container">
          {mockAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`alert-card ${alert.type} ${alert.read ? 'read' : 'unread'}`}
            >
              <div className="alert-header">
                <h3>{alert.title}</h3>
                {!alert.read && <span className="unread-indicator">New</span>}
              </div>
              {alert.patientName && (
                <p className="alert-patient">Patient: {alert.patientName}</p>
              )}
              <p className="alert-description">{alert.description}</p>
              <div className="alert-footer">
                <span className="alert-time">{alert.timestamp}</span>
                <button className="btn-link">View Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};
