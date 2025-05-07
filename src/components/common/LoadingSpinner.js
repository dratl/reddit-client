// src/components/common/LoadingSpinner.js
import React from 'react';
import '../../styles/main.css'; 

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner-container">
      <div className="loading-spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p>Loading...</p>
    </div>
  );
};

export default LoadingSpinner;