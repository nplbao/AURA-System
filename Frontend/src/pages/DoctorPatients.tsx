import { useState } from 'react';
import { Layout } from '../components/Layout';
import './Dashboard.css';

export const DoctorPatients = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRisk, setFilterRisk] = useState('all');

  const mockPatients = [
    { id: '1', name: 'John Doe', email: 'john@example.com', riskLevel: 'high', lastAnalysis: '2024-01-15' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', riskLevel: 'low', lastAnalysis: '2024-01-10' },
    { id: '3', name: 'Bob Johnson', email: 'bob@example.com', riskLevel: 'medium', lastAnalysis: '2024-01-12' },
  ];

  const filteredPatients = mockPatients.filter((patient) => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk = filterRisk === 'all' || patient.riskLevel === filterRisk;
    return matchesSearch && matchesRisk;
  });

  return (
    <Layout>
      <div className="dashboard">
        <h1>Patient Management</h1>

        <div className="filters-section">
          <input
            type="text"
            placeholder="Search by name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select
            value={filterRisk}
            onChange={(e) => setFilterRisk(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Risk Levels</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="patients-table">
          <table>
            <thead>
              <tr>
                <th>Patient ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Risk Level</th>
                <th>Last Analysis</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient) => (
                <tr key={patient.id}>
                  <td>{patient.id}</td>
                  <td>{patient.name}</td>
                  <td>{patient.email}</td>
                  <td>
                    <span className={`risk-badge ${patient.riskLevel}-risk`}>
                      {patient.riskLevel.toUpperCase()}
                    </span>
                  </td>
                  <td>{patient.lastAnalysis}</td>
                  <td>
                    <button className="btn-link">View History</button>
                    <button className="btn-link">Message</button>
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
