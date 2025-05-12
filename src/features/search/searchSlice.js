import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const predefinedQueries = [
  'fernandez noroña',
  'andrea chavez',
  'ernesto zedillo',
  'claudia sheinbaum',
  'alito moreno',
];

// Cache for search term stats
const statsCache = {};

export const fetchSearchTermStats = createAsyncThunk(
  'search/fetchStats',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      
      // Check cache first
      const cacheKey = 'search-stats';
      if (statsCache[cacheKey] && Date.now() - statsCache[cacheKey].timestamp < 3600000) {
        return statsCache[cacheKey].data;
      }

      const stats = await Promise.all(
        predefinedQueries.map(async (query) => {
          const response = await axios.get(`${process.env.API_BASE}/search/stats`, {
            params: { q: query, time: '3d' },
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          });
          return {
            query,
            count: response.data.count,
            comments: response.data.comments,
            score: response.data.score,
          };
        })
      );

      const data = stats.reduce((acc, stat) => {
        acc[stat.query] = {
          count: stat.count,
          comments: stat.comments,
          score: stat.score,
        };
        return acc;
      }, {});

      // Cache the result
      statsCache[cacheKey] = {
        data,
        timestamp: Date.now(),
      };

      return data;
    } catch (error) {
      if (error.response && error.response.status === 429) {
        return rejectWithValue('Rate limit exceeded. Please try again later.');
      }
      return rejectWithValue(error.message);
    }
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    predefinedQueries,
    currentQuery: '',
    stats: {},
    isLoading: false,
    error: null,
  },
  reducers: {
    setCurrentQuery: (state, action) => {
      state.currentQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchTermStats.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSearchTermStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stats = action.payload;
      })
      .addCase(fetchSearchTermStats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setCurrentQuery } = searchSlice.actions;
// Selector to get the search state
export const selectSearch = (state) => state.search;
export default searchSlice.reducer;