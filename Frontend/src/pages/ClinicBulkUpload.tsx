import { useState } from 'react';
import { Layout } from '../components/Layout';
import './Dashboard.css';

export const ClinicBulkUpload = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleBulkUpload = async () => {
    setUploading(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          alert('Bulk upload completed!');
          setFiles([]);
          return 0;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <Layout>
      <div className="dashboard">
        <h1>Bulk Image Upload</h1>

        <div className="upload-section">
          <div className="upload-card">
            <h2>Upload Multiple Retinal Images</h2>
            <p className="upload-description">
              Upload multiple images at once for batch analysis. Supports Fundus and OCT images.
            </p>

            <div className="upload-area large">
              <input
                type="file"
                id="bulk-upload"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              <label htmlFor="bulk-upload" className="upload-label">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                <p>Click to select multiple files or drag and drop</p>
                <p className="upload-hint">You can select up to 100 images at once</p>
              </label>
            </div>

            {files.length > 0 && (
              <div className="files-list">
                <h3>Selected Files ({files.length})</h3>
                <div className="files-grid">
                  {files.slice(0, 10).map((file, index) => (
                    <div key={index} className="file-item-small">
                      {file.name}
                    </div>
                  ))}
                  {files.length > 10 && <p>...and {files.length - 10} more files</p>}
                </div>

                {uploading && (
                  <div className="upload-progress">
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                    <p>Uploading... {uploadProgress}%</p>
                  </div>
                )}

                <button
                  onClick={handleBulkUpload}
                  className="btn-primary"
                  disabled={uploading}
                >
                  {uploading ? 'Uploading...' : `Upload ${files.length} Images`}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};
