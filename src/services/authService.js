// src/services/authService.js
import axios from 'axios';

export const getOAuthUrl = () => {
    const params = new URLSearchParams({
      client_id: 'V5uiAm7QfZY2lLc4I1uPGw', // From your app settings
      response_type: 'code',
      state: 'random_string_here', // Should be random and validated later
      redirect_uri: 'http://localhost:3000/auth/callback',
      duration: 'temporary',
      scope: 'read',
    });
    return `https://www.reddit.com/api/v1/authorize?${params.toString()}`;
  };
  
  export const exchangeCodeForToken = async (code) => {
    try {
      const response = await axios.post(
        `${process.env.API_BASE}/auth/callback`,
        { code }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };