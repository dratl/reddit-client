import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  token: null,
  isLoading: false,
  error: null,
  expiresAt: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.token;
      state.expiresAt = action.payload.expiresAt;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
      state.expiresAt = null;
    },
  },
});

export const { setToken, setLoading, setError, clearToken } = authSlice.actions;

// Thunk to fetch token from storage
export const fetchTokenFromStorage = () => (dispatch) => {
  const token = localStorage.getItem('reddit_token');
  const expiresAt = localStorage.getItem('reddit_token_expires_at');

  if (token && expiresAt && new Date().getTime() < expiresAt) {
    dispatch(setToken({ token, expiresAt: parseInt(expiresAt) }));
  }
};

// Thunk to exchange code for token
export const exchangeCodeForToken = (code) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.post(`${process.env.API_BASE}/auth/token`, {
      code,
    });
    
    const { access_token, expires_in } = response.data;
    const expiresAt = new Date().getTime() + expires_in * 1000;
    
    localStorage.setItem('reddit_token', access_token);
    localStorage.setItem('reddit_token_expires_at', expiresAt.toString());
    
    dispatch(setToken({ token: access_token, expiresAt }));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Thunk to refresh token
export const refreshToken = () => async (dispatch, getState) => {
  const { auth } = getState();
  if (!auth.token || !auth.expiresAt) return;

  // Refresh token if it's about to expire (within 5 minutes)
  if (auth.expiresAt - new Date().getTime() < 300000) {
    dispatch(setLoading(true));
    try {
      const response = await axios.post(`${process.env.API_BASE}/auth/refresh`, {
        token: auth.token,
      });
      
      const { access_token, expires_in } = response.data;
      const expiresAt = new Date().getTime() + expires_in * 1000;
      
      localStorage.setItem('reddit_token', access_token);
      localStorage.setItem('reddit_token_expires_at', expiresAt.toString());
      
      dispatch(setToken({ token: access_token, expiresAt }));
    } catch (error) {
      dispatch(setError(error.message));
      dispatch(clearToken());
    } finally {
      dispatch(setLoading(false));
    }
  }
};

// Selector to get the auth state
export const selectAuth = (state) => state.auth;
export default authSlice.reducer;