import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchMultipleQueriesStats as fetchStatsFromAPI } from '../../api/redditApi';
import axios from 'axios';

export const fetchQueryStats = createAsyncThunk(
  'search/fetchQueryStats',
  async (queries, { rejectWithValue }) => {
    try {
      const stats = await fetchStatsFromAPI(queries);
      return stats;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const refreshQueryStats = createAsyncThunk(
  'search/refreshQueryStats',
  async (query, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://www.reddit.com/search.json?q=${query}&limit=1`);
      if (response.data.data.children.length > 0) {
        const post = response.data.data.children[0].data;
        return {
          query,
          stats: {
            upvotes: post.ups,
            comments: post.num_comments
          }
        };
      }
      return rejectWithValue('No posts found for this query');
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);