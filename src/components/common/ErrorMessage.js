// src/components/common/ErrorMessage.js
import React from 'react';
import '.././../styles/ErrorMessage.css'; 

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="error-message">
      <div className="error-icon">⚠️</div>
      <p>{message}</p>
      {onRetry && (
        <button 
          onClick={onRetry} 
          className="retry-button"
          aria-label="Retry loading"
        >
          Retry Now
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;