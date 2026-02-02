import { useState } from 'react';
import { Layout } from '../components/Layout';
import './Dashboard.css';

export const UserUpload = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [imageType, setImageType] = useState<'Fundus' | 'OCT'>('Fundus');
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleUpload = async () => {
    setUploading(true);
    // TODO: Implement actual upload
    setTimeout(() => {
      setUploading(false);
      alert('Images uploaded successfully!');
      setFiles([]);
    }, 2000);
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <Layout>
      <div className="dashboard">
        <h1>Upload Retinal Images</h1>
        
        <div className="upload-section">
          <div className="upload-card">
            <h2>Select Image Type</h2>
            <div className="image-type-selector">
              <button
                className={imageType === 'Fundus' ? 'btn-type active' : 'btn-type'}
                onClick={() => setImageType('Fundus')}
              >
                Fundus
              </button>
              <button
                className={imageType === 'OCT' ? 'btn-type active' : 'btn-type'}
                onClick={() => setImageType('OCT')}
              >
                OCT
              </button>
            </div>

            <div className="upload-area">
              <input
                type="file"
                id="file-upload"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              <label htmlFor="file-upload" className="upload-label">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                <p>Click to upload or drag and drop</p>
                <p className="upload-hint">PNG, JPG, JPEG up to 10MB</p>
              </label>
            </div>

            {files.length > 0 && (
              <div className="files-list">
                <h3>Selected Files ({files.length})</h3>
                {files.map((file, index) => (
                  <div key={index} className="file-item">
                    <span>{file.name}</span>
                    <button onClick={() => removeFile(index)} className="btn-remove">
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  onClick={handleUpload}
                  className="btn-primary"
                  disabled={uploading}
                >
                  {uploading ? 'Uploading...' : `Upload ${files.length} Image(s)`}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};
