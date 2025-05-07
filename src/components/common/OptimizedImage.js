// src/components/common/OptimizedImage.js
import React, { useState } from 'react';
import './OptimizedImage.css';

const OptimizedImage = ({ src, alt, ...props }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setLoaded(true);
  };

  const handleError = () => {
    setError(true);
  };

  if (error) {
    return (
      <div className="image-error">
        <span>Image not available</span>
      </div>
    );
  }

  return (
    <div className={`image-container ${loaded ? 'loaded' : ''}`}>
      {!loaded && <div className="image-placeholder" />}
      <img
        src={src}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
        style={{ opacity: loaded ? 1 : 0 }}
        {...props}
      />
    </div>
  );
};

export default OptimizedImage;