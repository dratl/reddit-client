// src/components/common/ErrorMessage.js
import React from 'react';
import PropTypes from 'prop-types';
import '.././../styles/ErrorMessage.css'; 

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="error-message">
      <div className="error-icon">⚠️</div>
      <div className="error-text">{message}</div>
      {onRetry && (
        <button 
          className="retry-button" 
          onClick={onRetry}
          aria-label="Retry"
        >
          Retry
        </button>
      )}
    </div>
  );
};

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
  onRetry: PropTypes.func,
};

ErrorMessage.defaultProps = {
  onRetry: null,
};

export default ErrorMessage;