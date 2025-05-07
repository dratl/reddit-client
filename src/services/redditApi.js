// src/services/redditApi.js
import axios from 'axios';

// Reddit API base URL
const BASE_URL = 'https://www.reddit.com';

// Client credentials (replace with your own)
const CLIENT_ID = 'V5uiAm7QfZY2lLc4I1uPGw'; // Your Reddit app client ID
const CLIENT_SECRET = 'xIwrNln-4OC-ORvD9Gu7-OyfuugYdQ'; // Only needed for user auth
const REDIRECT_URI = 'http://localhost:3000/auth/callback'; // For OAuth

// Basic API functions
export const fetchPosts = async (subreddit, sort = 'hot', limit = 25) => {
  try {
    const response = await axios.get(`${BASE_URL}/r/${subreddit}/${sort}.json?limit=${limit}`);
    return response.data.data.children.map(child => child.data);
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export const searchPosts = async (query, sort = 'relevance', limit = 25) => {
  try {
    const response = await axios.get(`${BASE_URL}/search.json?q=${query}&sort=${sort}&limit=${limit}`);
    return response.data.data.children.map(child => child.data);
  } catch (error) {
    console.error('Error searching posts:', error);
    throw error;
  }
};

export const fetchPostDetails = async (permalink) => {
  try {
    const response = await axios.get(`${BASE_URL}${permalink}.json`);
    // The response contains both the post and comments
    return {
      post: response.data[0].data.children[0].data,
      comments: response.data[1].data.children.map(child => child.data),
    };
  } catch (error) {
    console.error('Error fetching post details:', error);
    throw error;
  }
};

// For OAuth2 authentication (optional)
export const getOAuthUrl = () => {
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: 'code',
    state: 'random_string',
    redirect_uri: REDIRECT_URI,
    duration: 'temporary',
    scope: 'read',
  });
  return `https://www.reddit.com/api/v1/authorize?${params.toString()}`;
};