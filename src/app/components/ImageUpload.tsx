'use client';
import { useState, ChangeEvent } from 'react';

export default function ImageUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [tags, setTags] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string>('');

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    
    // Parse tags from comma-separated string
    const tagArray = tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('tags', JSON.stringify(tagArray));

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setUploadedUrl(data.fileUrl);
        alert('Upload successful!');
        // Reset form
        setFile(null);
        setTags('');
      } else {
        alert('Upload failed');
      }
    } catch (error) {
      console.error('Error uploading:', error);
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
      <div>
        <label htmlFor="file-input">Select Image:</label>
        <input 
          id="file-input"
          type="file" 
          accept="image/*" 
          onChange={handleFileChange} 
        />
      </div>
      
      <div>
        <label htmlFor="tags-input">Tags (comma-separated):</label>
        <input
          id="tags-input"
          type="text"
          placeholder="e.g. coquette, red, oversized"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          style={{ width: '100%', padding: '8px' }}
        />
      </div>

      <button 
        onClick={handleUpload} 
        disabled={!file || uploading}
        style={{ padding: '10px' }}
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>

      {uploadedUrl && (
        <div>
          <p>Uploaded successfully!</p>
          <img src={uploadedUrl} alt="Uploaded" style={{ maxWidth: '300px' }} />
        </div>
      )}
    </div>
  );
}