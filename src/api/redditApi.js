import axios from 'axios';

const BASE_URL = 'https://www.reddit.com';

// Helper function to handle rate limiting
const handleRateLimit = async (error) => {
  if (error.response && error.response.status === 429) {
    const retryAfter = error.response.headers['retry-after'] || 5;
    console.warn(`Rate limited. Retrying after ${retryAfter} seconds...`);
    await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
    return true;
  }
  return false;
};

export const fetchPostsByQuery = async (query, limit = 20) => {
  try {
    const response = await axios.get(`${BASE_URL}/search.json?q=${query}&limit=${limit}`);
    return response.data.data.children.map(post => post.data);
  } catch (error) {
    const shouldRetry = await handleRateLimit(error);
    if (shouldRetry) {
      return fetchPostsByQuery(query, limit);
    }
    throw error;
  }
};

export const fetchMultipleQueriesStats = async (queries) => {
  try {
    const stats = {};
    
    for (const query of queries) {
      const response = await axios.get(`${BASE_URL}/search.json?q=${query}&limit=5`);
      if (response.data.data.children.length > 0) {
        const posts = response.data.data.children.map(child => child.data);
        stats[query] = {
          upvotes: posts.reduce((sum, post) => sum + post.ups, 0),
          comments: posts.reduce((sum, post) => sum + post.num_comments, 0),
        };
      }
    }
    
    return stats;
  } catch (error) {
    const shouldRetry = await handleRateLimit(error);
    if (shouldRetry) {
      return fetchMultipleQueriesStats(queries);
    }
    throw error;
  }
};

export const fetchPostDetails = async (postId) => {
  try {
    const response = await axios.get(`${BASE_URL}/by_id/t3_${postId}.json`);
    return response.data.data.children[0].data;
  } catch (error) {
    const shouldRetry = await handleRateLimit(error);
    if (shouldRetry) {
      return fetchPostDetails(postId);
    }
    throw error;
  }
};