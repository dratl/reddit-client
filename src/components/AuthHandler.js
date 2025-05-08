// src/components/AuthHandler.js
import { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { exchangeCodeForToken } from '../services/authService';

const AuthHandler = () => {
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get('code');
    const error = params.get('error');

    if (error) {
      console.error('OAuth error:', error);
      history.push('/');
      return;
    }

    if (code) {
      exchangeCodeForToken(code)
        .then(({ accessToken }) => {
          localStorage.setItem('reddit_access_token', accessToken);
          history.push('/');
        })
        .catch((err) => {
          console.error('Token exchange failed:', err);
          history.push('/');
        });
    }
  }, [location, history]);

  return <div>Authenticating...</div>;
};

export default AuthHandler;