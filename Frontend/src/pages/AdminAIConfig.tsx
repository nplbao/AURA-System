import { useState } from 'react';
import { Layout } from '../components/Layout';
import './Dashboard.css';

export const AdminAIConfig = () => {
  const [config, setConfig] = useState({
    riskThresholdLow: 0.3,
    riskThresholdMedium: 0.6,
    riskThresholdHigh: 0.8,
    retrainingInterval: 30,
    autoRetrain: true,
    modelVersion: 'v2.1.0',
  });

  const handleChange = (field: string, value: any) => {
    setConfig({
      ...config,
      [field]: value,
    });
  };

  const handleSave = () => {
    // TODO: Implement save
    alert('AI configuration saved successfully!');
  };

  return (
    <Layout>
      <div className="dashboard">
        <h1>AI Configuration</h1>

        <div className="config-section">
          <h2>Risk Thresholds</h2>
          <div className="config-form">
            <div className="form-group">
              <label>Low Risk Threshold</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="1"
                value={config.riskThresholdLow}
                onChange={(e) => handleChange('riskThresholdLow', parseFloat(e.target.value))}
              />
            </div>
            <div className="form-group">
              <label>Medium Risk Threshold</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="1"
                value={config.riskThresholdMedium}
                onChange={(e) => handleChange('riskThresholdMedium', parseFloat(e.target.value))}
              />
            </div>
            <div className="form-group">
              <label>High Risk Threshold</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="1"
                value={config.riskThresholdHigh}
                onChange={(e) => handleChange('riskThresholdHigh', parseFloat(e.target.value))}
              />
            </div>
          </div>
        </div>

        <div className="config-section">
          <h2>Model Retraining</h2>
          <div className="config-form">
            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  checked={config.autoRetrain}
                  onChange={(e) => handleChange('autoRetrain', e.target.checked)}
                />
                Enable Automatic Retraining
              </label>
            </div>
            <div className="form-group">
              <label>Retraining Interval (days)</label>
              <input
                type="number"
                value={config.retrainingInterval}
                onChange={(e) => handleChange('retrainingInterval', parseInt(e.target.value))}
              />
            </div>
            <div className="form-group">
              <label>Current Model Version</label>
              <input
                type="text"
                value={config.modelVersion}
                readOnly
                className="readonly-input"
              />
            </div>
          </div>
        </div>

        <div className="config-actions">
          <button onClick={handleSave} className="btn-primary">
            Save Configuration
          </button>
          <button className="btn-secondary">
            Trigger Manual Retraining
          </button>
        </div>
      </div>
    </Layout>
  );
};
