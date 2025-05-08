// server.js
const path = require('path');
const express = require('express');

const app = express();

// Serve static files from React in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

require('dotenv').config();
const axios = require('axios');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

// Enhanced CORS configuration
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5001', // Frontend's origin here
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST'],
  credentials: true,
}));

// Rate limiting (Reddit API has 60 requests/minute limit)
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 60, // limit each IP to 50 requests per windowMs
  message: 'Too many requests, please try again later'
});
app.use(limiter);

// Environment variables
const {
  REDDIT_CLIENT_ID,
  REDDIT_CLIENT_SECRET,
  REDDIT_REDIRECT_URI,
  REDDIT_USER_AGENT
} = process.env;

// Verify required environment variables
if (!REDDIT_CLIENT_ID || !REDDIT_CLIENT_SECRET || !REDDIT_REDIRECT_URI) {
  console.error('Missing required environment variables');
  process.exit(1);
}

// Token exchange endpoint
app.get('/api/auth/callback', async (req, res) => {
  try {
    const { code, state } = req.query;
    
    // Validate state parameter (basic example)
    if (state !== 'random_string') {
      return res.status(400).json({ error: 'Invalid state parameter' });
    }

    const response = await axios.post(
      'https://www.reddit.com/api/v1/access_token',
      new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDDIT_REDIRECT_URI,
      }),
      {
        auth: {
          username: REDDIT_CLIENT_ID,
          password: REDDIT_CLIENT_SECRET,
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': REDDIT_USER_AGENT || 'RedditClient/1.0 by YourUsername',
        },
      }
    );

    // Return token with expiration
    res.json({
      accessToken: response.data.access_token,
      expiresIn: response.data.expires_in,
      refreshToken: response.data.refresh_token,
      tokenType: response.data.token_type
    });
  } catch (error) {
    console.error('Token exchange error:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Failed to authenticate',
      details: error.response?.data || error.message
    });
  }
});

// API proxy endpoint
app.get('/api/reddit/*', async (req, res) => {
  try {
    const url = req.params[0];
    const { accessToken, ...queryParams } = req.query;

    if (!accessToken) {
      return res.status(401).json({ error: 'Access token required' });
    }

    // Validate the requested URL path
    const allowedPaths = ['r/', 'user/', 'api/', 'search'];
    if (!allowedPaths.some(path => url.startsWith(path))) {
      return res.status(400).json({ error: 'Invalid API endpoint' });
    }

    // Make the request to the Reddit API
    const response = await axios.get(`https://oauth.reddit.com/${url}`, {
      params: queryParams, // Pass only the remaining query parameters
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'User-Agent': REDDIT_USER_AGENT || 'RedditClient/1.0 by YourUsername',
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Proxy error:', {
      message: error.message,
      responseData: error.response?.data,
      status: error.response?.status,
      headers: error.response?.headers,
    });

    const status = error.response?.status || 500;
    res.status(status).json({
      error: 'Failed to fetch from Reddit API',
      details: error.response?.data || error.message,
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, 'localhost', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`CORS configured for origin: ${process.env.CLIENT_ORIGIN || 'http://localhost:3000'}`);
});