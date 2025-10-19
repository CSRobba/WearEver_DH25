'use client';
import { useState, useEffect } from 'react';

interface Image {
  key: string;
  url: string;
  lastModified: string;
  size: number;
  tags?: string[];
}

export default function ImageGallery() {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch('/api/images');
      const data = await response.json();
      
      // DEBUG: Log what we're getting
      console.log('API Response:', data);
      console.log('First image:', data.images?.[0]);
      
      setImages(data.images);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading images...</div>;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
      {images.map((image) => (
        <div key={image.key} style={{ border: '1px solid #ccc', padding: '10px' }}>
          <img 
            src={image.url} 
            alt={image.key}
            style={{ width: '100%', height: '200px', objectFit: 'cover' }}
          />
          <p style={{ fontSize: '30px', margin: '5px 0' }}>{image.key}</p>
          
          {/* DEBUG: Show what tags value is */}
          <p style={{ fontSize: '12px', color: 'red' }}>
            Tags: {JSON.stringify(image.tags)}
          </p>
          
          {image.tags && image.tags.length > 0 && (
            <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
              {image.tags.map((tag, index) => (
                <span 
                  key={index}
                  style={{
                    backgroundColor: '#e0e0e0',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontSize: '11px'
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}