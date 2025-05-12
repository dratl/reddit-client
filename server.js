require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const querystring = require('querystring');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const REDDIT_CLIENT_ID = process.env.REDDIT_CLIENT_ID;
const REDDIT_CLIENT_SECRET = process.env.REDDIT_CLIENT_SECRET;
const REDDIT_REDIRECT_URI = process.env.REDDIT_REDIRECT_URI;

// Exchange code for token
app.post('/api/auth/token', async (req, res) => {
  try {
    const { code } = req.body;
    const authString = Buffer.from(`${REDDIT_CLIENT_ID}:${REDDIT_CLIENT_SECRET}`).toString('base64');
    
    const response = await axios.post(
      'https://www.reddit.com/api/v1/access_token',
      querystring.stringify({
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDDIT_REDIRECT_URI,
      }),
      {
        headers: {
          'Authorization': `Basic ${authString}`,
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': process.env.REDDIT_USER_AGENT,
        },
      }
    );

    res.json({
      access_token: response.data.access_token,
      expires_in: response.data.expires_in,
    });
  } catch (error) {
    console.error('Token exchange error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to exchange code for token' });
  }
});

// Refresh token
app.post('/api/auth/refresh', async (req, res) => {
  try {
    const { token } = req.body;
    const authString = Buffer.from(`${REDDIT_CLIENT_ID}:${REDDIT_CLIENT_SECRET}`).toString('base64');
    
    const response = await axios.post(
      'https://www.reddit.com/api/v1/access_token',
      querystring.stringify({
        grant_type: 'refresh_token',
        refresh_token: token,
      }),
      {
        headers: {
          'Authorization': `Basic ${authString}`,
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': process.env.REDDIT_USER_AGENT,
        },
      }
    );

    res.json({
      access_token: response.data.access_token,
      expires_in: response.data.expires_in,
    });
  } catch (error) {
    console.error('Token refresh error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to refresh token' });
  }
});

// Search posts
app.get('/api/posts', async (req, res) => {
  try {
    const { q, after } = req.query;
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const response = await axios.get(`https://oauth.reddit.com/search.json`, {
      params: {
        q,
        after,
        limit: 20,
        sort: 'new',
      },
      headers: {
        'Authorization': `Bearer ${token}`,
        'User-Agent': process.env.REDDIT_USER_AGENT,
      },
    });

    res.json(response.data);
  } catch (error) {
    if (error.response?.status === 429) {
      res.status(429).json({ error: 'Rate limit exceeded' });
    } else {
      console.error('Search error:', error.response?.data || error.message);
      res.status(500).json({ error: 'Failed to search posts' });
    }
  }
});

// Get post by ID
app.get('/api/posts/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const response = await axios.get(`https://oauth.reddit.com/comments/${postId}.json`, {
      params: {
        limit: 1,
      },
      headers: {
        'Authorization': `Bearer ${token}`,
        'User-Agent': process.env.REDDIT_USER_AGENT,
      },
    });

    res.json(response.data);
  } catch (error) {
    if (error.response?.status === 429) {
      res.status(429).json({ error: 'Rate limit exceeded' });
    } else {
      console.error('Post fetch error:', error.response?.data || error.message);
      res.status(500).json({ error: 'Failed to fetch post' });
    }
  }
});

// Get search term stats
app.get('/api/search/stats', async (req, res) => {
  try {
    const { q, time = '3d' } = req.query;
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Get posts count
    const postsResponse = await axios.get(`https://oauth.reddit.com/search.json`, {
      params: {
        q,
        limit: 0,
        sort: 'new',
        t: time,
      },
      headers: {
        'Authorization': `Bearer ${token}`,
        'User-Agent': process.env.REDDIT_USER_AGENT,
      },
    });

    // Calculate total comments and score (approximation)
    let totalComments = 0;
    let totalScore = 0;
    const samplePosts = postsResponse.data.data.children.slice(0, 10).map(post => post.data);

    for (const post of samplePosts) {
      totalComments += post.num_comments;
      totalScore += post.score;
    }

    // Average and extrapolate for the full count
    const postCount = postsResponse.data.data.dist;
    const avgComments = samplePosts.length > 0 ? totalComments / samplePosts.length : 0;
    const avgScore = samplePosts.length > 0 ? totalScore / samplePosts.length : 0;

    res.json({
      count: postCount,
      comments: Math.round(avgComments * postCount),
      score: Math.round(avgScore * postCount),
    });
  } catch (error) {
    if (error.response?.status === 429) {
      res.status(429).json({ error: 'Rate limit exceeded' });
    } else {
      console.error('Stats error:', error.response?.data || error.message);
      res.status(500).json({ error: 'Failed to get search stats' });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});