import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Cache object to store fetched posts
const postsCache = {};

export const fetchPostsByQuery = createAsyncThunk(
  'posts/fetchByQuery',
  async ({ query, after = null }, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      
      // Check cache first
      const cacheKey = `${query}-${after || 'initial'}`;
      if (postsCache[cacheKey] && Date.now() - postsCache[cacheKey].timestamp < 300000) {
        return postsCache[cacheKey].data;
      }

      const response = await axios.get(`${process.env.API_BASE}/posts`, {
        params: { q: query, after },
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      const data = {
        posts: response.data.data.children.map(child => child.data),
        after: response.data.data.after,
      };

      // Cache the result
      postsCache[cacheKey] = {
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

export const fetchPostById = createAsyncThunk(
  'posts/fetchById',
  async (postId, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      
      // Check cache first
      if (postsCache[postId] && Date.now() - postsCache[postId].timestamp < 300000) {
        return postsCache[postId].data;
      }

      const response = await axios.get(`${process.env.API_BASE}/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      const data = response.data[0].data.children[0].data;

      // Cache the result
      postsCache[postId] = {
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

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [],
    currentPost: null,
    after: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    clearPosts: (state) => {
      state.items = [];
      state.after = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsByQuery.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPostsByQuery.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.posts;
        state.after = action.payload.after;
      })
      .addCase(fetchPostsByQuery.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchPostById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentPost = action.payload;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearPosts } = postsSlice.actions;
// Selector to get the posts state
export const selectPosts = (state) => state.posts;
export default postsSlice.reducer;