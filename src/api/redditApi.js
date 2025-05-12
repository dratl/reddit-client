import axios from 'axios';

const BASE_URL = 'https://www.reddit.com';

export const fetchPostsByQuery = async (query, limit = 20) => {
  try {
    const response = await axios.get(`${BASE_URL}/search.json?q=${query}&limit=${limit}`);
    return response.data.data.children.map(post => post.data);
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export const fetchMultipleQueriesStats = async (queries) => {
  try {
    const stats = {};
    
    for (const query of queries) {
      const response = await axios.get(`${BASE_URL}/search.json?q=${query}&limit=1`);
      if (response.data.data.children.length > 0) {
        const post = response.data.data.children[0].data;
        stats[query] = {
          upvotes: post.ups,
          comments: post.num_comments,
        };
      }
    }
    
    return stats;
  } catch (error) {
    console.error('Error fetching query stats:', error);
    throw error;
  }
};