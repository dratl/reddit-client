// src/services/redditApi.js
import axios from 'axios';
import { requestQueue } from './requestQueue';

// Create axios instance with defaults
const apiClient = axios.create({
  baseURL: process.env.API_BASE || '/api',
  timeout: 10000,
});

// Add request interceptor for auth token
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('reddit_access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Enhanced error handler
const handleApiError = (error) => {
  if (error.response) {
    // Server responded with status code outside 2xx
    console.error('API Error Response:', {
      status: error.response.status,
      data: error.response.data,
      headers: error.response.headers,
    });
    
    if (error.response.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('reddit_access_token');
      window.location.href = '/'; // Redirect root
    }
    
    return Promise.reject({
      message: error.response.data?.message || 'API request failed',
      status: error.response.status,
      data: error.response.data,
    });
  } else if (error.request) {
    // Request was made but no response received
    console.error('API No Response:', error.request);
    return Promise.reject({
      message: 'No response from server',
      isNetworkError: true,
    });
  } else {
    // Something happened in setting up the request
    console.error('API Setup Error:', error.message);
    return Promise.reject({
      message: 'Request setup failed',
      details: error.message,
    });
  }
};

// Adding retry logic
const withRetry = async (requestFn, retries = 2, delay = 1000) => {
  try {
    return await requestFn();
  } catch (error) {
    if (error.response?.status === 429 && retries > 0) {
      const retryAfter = error.response.headers['retry-after'] || delay;
      await new Promise(res => setTimeout(res, retryAfter * 1000));
      return withRetry(requestFn, retries - 1, retryAfter * 2);
    }
    throw error;
  }
};

// API functions
export const fetchPosts = async (subreddit, sort = 'hot', limit = 25) => {
  return requestQueue.add(() => 
    withRetry(async () => {
      const response = await apiClient.get(`/reddit/r/${subreddit}/${sort}`, {
        params: { limit },
      });
      return response.data.data.children.map(child => child.data);
    })
  );
};

export const searchPosts = async (query, sort = 'relevance', limit = 25) => {
  try {
    const response = await apiClient.get('/reddit/search', {
      params: { q: query, sort, limit },
    });
    return response.data.data.children.map(child => child.data);
  } catch (error) {
    return handleApiError(error);
  }
};

export const fetchPostDetails = async (permalink) => {
  try {
    const response = await apiClient.get(`/reddit${permalink}`);
    return {
      post: response.data[0].data.children[0].data,
      comments: response.data[1].data.children.map(child => child.data),
    };
  } catch (error) {
    return handleApiError(error);
  }
};