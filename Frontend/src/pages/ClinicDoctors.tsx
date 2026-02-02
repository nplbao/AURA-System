import { useState } from 'react';
import { Layout } from '../components/Layout';
import './Dashboard.css';

export const ClinicDoctors = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const mockDoctors = [
    { id: '1', name: 'Dr. Smith', email: 'smith@clinic.com', patients: 25, status: 'active' },
    { id: '2', name: 'Dr. Johnson', email: 'johnson@clinic.com', patients: 18, status: 'active' },
  ];

  return (
    <Layout>
      <div className="dashboard">
        <h1>Clinic Doctors</h1>

        <div className="filters-section">
          <input
            type="text"
            placeholder="Search doctors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="patients-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Assigned Patients</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockDoctors.map((doctor) => (
                <tr key={doctor.id}>
                  <td>{doctor.name}</td>
                  <td>{doctor.email}</td>
                  <td>{doctor.patients}</td>
                  <td>
                    <span className={`status-badge ${doctor.status}`}>
                      {doctor.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn-link">View</button>
                    <button className="btn-link">Edit</button>
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
