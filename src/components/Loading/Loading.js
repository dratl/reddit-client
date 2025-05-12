import React from 'react';
import { CircularProgress } from '@mui/material';
import './Loading.css';

const Loading = ({ message }) => {
  return (
    <div className="loading-container">
      <CircularProgress size={60} thickness={4} />
      {message && <p className="loading-message">{message}</p>}
    </div>
  );
};

export default Loading;