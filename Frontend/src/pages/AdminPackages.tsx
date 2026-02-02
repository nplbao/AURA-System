import { useState } from 'react';
import { Layout } from '../components/Layout';
import './Dashboard.css';

export const AdminPackages = () => {
  const [packages, setPackages] = useState([
    { id: '1', name: 'Basic', credits: 10, price: 29.99, duration: 30, active: true },
    { id: '2', name: 'Standard', credits: 25, price: 59.99, duration: 30, active: true },
    { id: '3', name: 'Premium', credits: 50, price: 99.99, duration: 30, active: true },
  ]);

  const [editingPackage, setEditingPackage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    credits: 0,
    price: 0,
    duration: 30,
  });

  const handleEdit = (pkg: any) => {
    setEditingPackage(pkg.id);
    setFormData({
      name: pkg.name,
      credits: pkg.credits,
      price: pkg.price,
      duration: pkg.duration,
    });
  };

  const handleSave = () => {
    if (editingPackage) {
      setPackages(packages.map((p) =>
        p.id === editingPackage
          ? { ...p, ...formData }
          : p
      ));
    } else {
      // Add new package
      setPackages([...packages, {
        id: Date.now().toString(),
        ...formData,
        active: true,
      }]);
    }
    setEditingPackage(null);
    setFormData({ name: '', credits: 0, price: 0, duration: 30 });
  };

  const handleToggleActive = (id: string) => {
    setPackages(packages.map((p) =>
      p.id === id ? { ...p, active: !p.active } : p
    ));
  };

  return (
    <Layout>
      <div className="dashboard">
        <h1>Service Package Management</h1>

        <div className="packages-management">
          <div className="packages-list">
            <h2>Current Packages</h2>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Credits</th>
                  <th>Price</th>
                  <th>Duration (days)</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {packages.map((pkg) => (
                  <tr key={pkg.id}>
                    <td>{pkg.name}</td>
                    <td>{pkg.credits}</td>
                    <td>${pkg.price}</td>
                    <td>{pkg.duration}</td>
                    <td>
                      <span className={`status-badge ${pkg.active ? 'active' : 'inactive'}`}>
                        {pkg.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => handleEdit(pkg)}
                        className="btn-link"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleToggleActive(pkg.id)}
                        className="btn-link"
                      >
                        {pkg.active ? 'Deactivate' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="package-form-section">
            <h2>{editingPackage ? 'Edit Package' : 'Create New Package'}</h2>
            <div className="form-group">
              <label>Package Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Image Credits</label>
              <input
                type="number"
                value={formData.credits}
                onChange={(e) => setFormData({ ...formData, credits: parseInt(e.target.value) })}
              />
            </div>
            <div className="form-group">
              <label>Price ($)</label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
              />
            </div>
            <div className="form-group">
              <label>Duration (days)</label>
              <input
                type="number"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
              />
            </div>
            <button onClick={handleSave} className="btn-primary">
              {editingPackage ? 'Update Package' : 'Create Package'}
            </button>
            {editingPackage && (
              <button
                onClick={() => {
                  setEditingPackage(null);
                  setFormData({ name: '', credits: 0, price: 0, duration: 30 });
                }}
                className="btn-secondary"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};
