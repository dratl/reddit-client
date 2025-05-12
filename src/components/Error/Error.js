import React from 'react';
import { Alert, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Error.css';

const Error = ({ message, retryFn }) => {
  const navigate = useNavigate();

  return (
    <div className="error-container">
      <Alert severity="error" className="error-message">
        {message || 'An unexpected error occurred.'}
      </Alert>
      <div className="error-actions">
        {retryFn && (
          <Button variant="contained" color="primary" onClick={retryFn}>
            Retry
          </Button>
        )}
        <Button variant="outlined" onClick={() => navigate('/')}>
          Go Home
        </Button>
      </div>
    </div>
  );
};

export default Error;