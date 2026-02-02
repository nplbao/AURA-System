import { Layout } from '../components/Layout';
import './Dashboard.css';

export const UserHistory = () => {
  const mockHistory = [
    { id: '1', date: '2024-01-15', type: 'Fundus', risk: 'high', status: 'completed' },
    { id: '2', date: '2024-01-10', type: 'OCT', risk: 'low', status: 'completed' },
    { id: '3', date: '2024-01-05', type: 'Fundus', risk: 'medium', status: 'completed' },
    { id: '4', date: '2023-12-28', type: 'Fundus', risk: 'low', status: 'completed' },
  ];

  return (
    <Layout>
      <div className="dashboard">
        <h1>Analysis History</h1>

        <div className="history-filters">
          <select className="filter-select">
            <option>All Types</option>
            <option>Fundus</option>
            <option>OCT</option>
          </select>
          <select className="filter-select">
            <option>All Risk Levels</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
          <input type="date" className="filter-input" />
        </div>

        <div className="history-table">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Image Type</th>
                <th>Risk Level</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockHistory.map((item) => (
                <tr key={item.id}>
                  <td>{item.date}</td>
                  <td>{item.type}</td>
                  <td>
                    <span className={`risk-badge ${item.risk}-risk`}>
                      {item.risk.toUpperCase()}
                    </span>
                  </td>
                  <td>{item.status}</td>
                  <td>
                    <button className="btn-link">View</button>
                    <button className="btn-link">Export</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};
