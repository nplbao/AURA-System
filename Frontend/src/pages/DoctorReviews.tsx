import { useState } from 'react';
import { Layout } from '../components/Layout';
import './Dashboard.css';

export const DoctorReviews = () => {
  const [selectedReview, setSelectedReview] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  const [validation, setValidation] = useState<'validated' | 'corrected' | null>(null);

  const mockReviews = [
    {
      id: '1',
      patientName: 'John Doe',
      imageUrl: '/placeholder.jpg',
      aiFindings: ['Diabetic retinopathy detected', 'Microaneurysms present'],
      aiRiskLevel: 'high',
      uploadDate: '2024-01-15',
    },
  ];

  const handleValidate = () => {
    // TODO: Implement validation
    alert('Review validated successfully!');
  };

  const handleCorrect = () => {
    // TODO: Implement correction
    alert('Corrections saved!');
  };

  return (
    <Layout>
      <div className="dashboard">
        <h1>AI Analysis Reviews</h1>

        <div className="reviews-container">
          <div className="reviews-list-section">
            {mockReviews.map((review) => (
              <div
                key={review.id}
                className={`review-card ${selectedReview === review.id ? 'selected' : ''}`}
                onClick={() => setSelectedReview(review.id)}
              >
                <h3>{review.patientName}</h3>
                <p>Uploaded: {review.uploadDate}</p>
                <span className={`risk-badge ${review.aiRiskLevel}-risk`}>
                  AI: {review.aiRiskLevel.toUpperCase()} RISK
                </span>
              </div>
            ))}
          </div>

          {selectedReview && (
            <div className="review-details">
              <h2>Review Analysis</h2>
              {(() => {
                const review = mockReviews.find((r) => r.id === selectedReview);
                if (!review) return null;
                return (
                  <>
                    <div className="detail-section">
                      <h3>Annotated Image</h3>
                      <div className="image-placeholder">
                        <p>Annotated retinal image would appear here</p>
                      </div>
                    </div>

                    <div className="detail-section">
                      <h3>AI Findings</h3>
                      <ul>
                        {review.aiFindings.map((finding, idx) => (
                          <li key={idx}>{finding}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="detail-section">
                      <h3>Doctor Notes</h3>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows={4}
                        placeholder="Add your medical notes, diagnosis, or recommendations..."
                      />
                    </div>

                    <div className="detail-section">
                      <h3>Validation</h3>
                      <div className="validation-buttons">
                        <button
                          onClick={() => {
                            setValidation('validated');
                            handleValidate();
                          }}
                          className={`btn-secondary ${validation === 'validated' ? 'active' : ''}`}
                        >
                          Validate AI Results
                        </button>
                        <button
                          onClick={() => {
                            setValidation('corrected');
                            handleCorrect();
                          }}
                          className={`btn-secondary ${validation === 'corrected' ? 'active' : ''}`}
                        >
                          Correct AI Results
                        </button>
                      </div>
                    </div>

                    <div className="detail-section">
                      <h3>Feedback for AI Improvement</h3>
                      <textarea
                        rows={3}
                        placeholder="Provide feedback to improve AI accuracy..."
                      />
                      <button className="btn-secondary" style={{ marginTop: '0.5rem' }}>
                        Submit Feedback
                      </button>
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
