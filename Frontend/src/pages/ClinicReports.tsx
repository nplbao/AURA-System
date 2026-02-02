import { useState } from 'react';
import { Layout } from '../components/Layout';
import './Dashboard.css';

export const ClinicReports = () => {
  const [reportType, setReportType] = useState<'screening' | 'statistics' | 'research'>('screening');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const mockReportData = {
    totalScreened: 156,
    highRisk: 12,
    mediumRisk: 34,
    lowRisk: 110,
    avgRiskLevel: 'Low-Medium',
  };

  const handleGenerateReport = () => {
    // TODO: Implement report generation
    alert('Report generated successfully!');
  };

  const handleExport = (format: 'PDF' | 'CSV') => {
    // TODO: Implement export
    alert(`Exporting report as ${format}...`);
  };

  return (
    <Layout>
      <div className="dashboard">
        <h1>Clinic Reports</h1>

        <div className="report-config">
          <div className="form-group">
            <label>Report Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value as any)}
              className="filter-select"
            >
              <option value="screening">Screening Campaign Report</option>
              <option value="statistics">Statistics Summary</option>
              <option value="research">Research Data Export</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Start Date</label>
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>End Date</label>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              />
            </div>
          </div>

          <button onClick={handleGenerateReport} className="btn-primary">
            Generate Report
          </button>
        </div>

        <div className="report-preview">
          <h2>Report Preview</h2>
          <div className="report-content">
            <div className="report-section">
              <h3>Screening Summary</h3>
              <div className="report-stats">
                <div className="report-stat">
                  <span>Total Screened:</span>
                  <strong>{mockReportData.totalScreened}</strong>
                </div>
                <div className="report-stat">
                  <span>High Risk:</span>
                  <strong className="high-risk">{mockReportData.highRisk}</strong>
                </div>
                <div className="report-stat">
                  <span>Medium Risk:</span>
                  <strong className="medium-risk">{mockReportData.mediumRisk}</strong>
                </div>
                <div className="report-stat">
                  <span>Low Risk:</span>
                  <strong className="low-risk">{mockReportData.lowRisk}</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="export-buttons">
            <button onClick={() => handleExport('PDF')} className="btn-secondary">
              Export as PDF
            </button>
            <button onClick={() => handleExport('CSV')} className="btn-secondary">
              Export as CSV
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};
