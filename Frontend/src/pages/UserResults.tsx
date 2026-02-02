import { useState } from 'react';
import { Layout } from '../components/Layout';
import './Dashboard.css';

export const UserResults = () => {
  const [selectedResult, setSelectedResult] = useState<string | null>(null);

  const mockResults = [
    {
      id: '1',
      imageName: 'fundus_left_eye.jpg',
      uploadDate: '2024-01-15',
      riskLevel: 'high' as const,
      status: 'completed' as const,
      findings: ['Diabetic retinopathy detected', 'Microaneurysms present'],
    },
    {
      id: '2',
      imageName: 'oct_right_eye.jpg',
      uploadDate: '2024-01-10',
      riskLevel: 'low' as const,
      status: 'completed' as const,
      findings: ['No significant abnormalities'],
    },
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'high-risk';
      case 'medium': return 'medium-risk';
      case 'low': return 'low-risk';
      default: return '';
    }
  };

  return (
    <Layout>
      <div className="dashboard">
        <h1>My Diagnostic Results</h1>

        <div className="results-container">
          <div className="results-list-section">
            {mockResults.map((result) => (
              <div
                key={result.id}
                className={`result-card ${selectedResult === result.id ? 'selected' : ''}`}
                onClick={() => setSelectedResult(result.id)}
              >
                <div className="result-header">
                  <h3>{result.imageName}</h3>
                  <span className={`risk-badge ${getRiskColor(result.riskLevel)}`}>
                    {result.riskLevel.toUpperCase()} RISK
                  </span>
                </div>
                <p className="result-date">Analyzed: {result.uploadDate}</p>
                <div className="result-actions">
                  <button className="btn-secondary">View Image</button>
                  <button className="btn-secondary">Download PDF</button>
                </div>
              </div>
            ))}
          </div>

          {selectedResult && (
            <div className="result-details">
              <h2>Analysis Details</h2>
              {(() => {
                const result = mockResults.find((r) => r.id === selectedResult);
                if (!result) return null;
                return (
                  <>
                    <div className="detail-section">
                      <h3>Findings</h3>
                      <ul>
                        {result.findings.map((finding, idx) => (
                          <li key={idx}>{finding}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="detail-section">
                      <h3>Annotated Image</h3>
                      <div className="image-placeholder">
                        <p>Annotated image visualization would appear here</p>
                      </div>
                    </div>
                    <div className="detail-section">
                      <h3>Recommendations</h3>
                      <p>
                        {result.riskLevel === 'high'
                          ? 'Please consult with your doctor immediately for further evaluation.'
                          : 'Continue regular monitoring as recommended.'}
                      </p>
                    </div>
                  </>
                );
              })()}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};
