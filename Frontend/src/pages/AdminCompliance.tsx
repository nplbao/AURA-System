import { Layout } from '../components/Layout';
import './Dashboard.css';

export const AdminCompliance = () => {
  const mockAuditLogs = [
    { id: '1', action: 'User login', user: 'john@example.com', timestamp: '2024-01-15 10:30', ip: '192.168.1.1' },
    { id: '2', action: 'Image uploaded', user: 'jane@example.com', timestamp: '2024-01-15 09:15', ip: '192.168.1.2' },
    { id: '3', action: 'Report exported', user: 'doctor@example.com', timestamp: '2024-01-15 08:45', ip: '192.168.1.3' },
  ];

  return (
    <Layout>
      <div className="dashboard">
        <h1>Compliance & Audit Logs</h1>

        <div className="compliance-section">
          <h2>Privacy Settings</h2>
          <div className="privacy-settings">
            <div className="setting-item">
              <label>
                <input type="checkbox" defaultChecked />
                Enable data encryption
              </label>
            </div>
            <div className="setting-item">
              <label>
                <input type="checkbox" defaultChecked />
                Require consent for data processing
              </label>
            </div>
            <div className="setting-item">
              <label>
                <input type="checkbox" defaultChecked />
                Enable audit logging
              </label>
            </div>
            <div className="setting-item">
              <label>
                <input type="checkbox" />
                Allow data export
              </label>
            </div>
          </div>
        </div>

        <div className="compliance-section">
          <h2>Audit Logs</h2>
          <div className="audit-filters">
            <input type="text" placeholder="Search logs..." className="search-input" />
            <input type="date" className="filter-input" />
            <select className="filter-select">
              <option>All Actions</option>
              <option>Login</option>
              <option>Upload</option>
              <option>Export</option>
            </select>
          </div>

          <div className="audit-table">
            <table>
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Action</th>
                  <th>User</th>
                  <th>IP Address</th>
                </tr>
              </thead>
              <tbody>
                {mockAuditLogs.map((log) => (
                  <tr key={log.id}>
                    <td>{log.timestamp}</td>
                    <td>{log.action}</td>
                    <td>{log.user}</td>
                    <td>{log.ip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="compliance-section">
          <h2>Data Export</h2>
          <div className="export-options">
            <button className="btn-secondary">Export Audit Logs (CSV)</button>
            <button className="btn-secondary">Export User Data (JSON)</button>
            <button className="btn-secondary">Generate Compliance Report</button>
          </div>
        </div>
      </div>
    </Layout>
  );
};
