import { useState } from 'react';
import { Layout } from '../components/Layout';
import './Dashboard.css';

export const AdminClinics = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const mockClinics = [
    { id: '1', name: 'Clinic ABC', email: 'clinic@example.com', doctors: 5, patients: 120, status: 'approved' },
    { id: '2', name: 'Clinic XYZ', email: 'xyz@example.com', doctors: 3, patients: 80, status: 'pending' },
  ];

  const filteredClinics = mockClinics.filter((clinic) => {
    const matchesSearch = clinic.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || clinic.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleApprove = (clinicId: string) => {
    // TODO: Implement approval
    alert(`Clinic ${clinicId} approved`);
  };

  const handleSuspend = (clinicId: string) => {
    // TODO: Implement suspension
    alert(`Clinic ${clinicId} suspended`);
  };

  return (
    <Layout>
      <div className="dashboard">
        <h1>Clinic Management</h1>

        <div className="filters-section">
          <input
            type="text"
            placeholder="Search clinics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Status</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>

        <div className="users-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Clinic Name</th>
                <th>Email</th>
                <th>Doctors</th>
                <th>Patients</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredClinics.map((clinic) => (
                <tr key={clinic.id}>
                  <td>{clinic.id}</td>
                  <td>{clinic.name}</td>
                  <td>{clinic.email}</td>
                  <td>{clinic.doctors}</td>
                  <td>{clinic.patients}</td>
                  <td>
                    <span className={`status-badge ${clinic.status}`}>
                      {clinic.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn-link">View</button>
                    {clinic.status === 'pending' && (
                      <button
                        onClick={() => handleApprove(clinic.id)}
                        className="btn-link"
                      >
                        Approve
                      </button>
                    )}
                    {clinic.status === 'approved' && (
                      <button
                        onClick={() => handleSuspend(clinic.id)}
                        className="btn-link"
                      >
                        Suspend
                      </button>
                    )}
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
