import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { exchangeCodeForToken } from '../features/auth/authSlice';

const AuthCallbackPage = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  useEffect(() => {
    if (error) {
      console.error('Auth error:', error);
      navigate('/');
    } else if (code) {
      dispatch(exchangeCodeForToken(code)).then(() => {
        navigate('/');
      });
    }
  }, [code, error, dispatch, navigate]);

  return <div>Processing authentication...</div>;
};

export default AuthCallbackPage;