import { createSlice } from '@reduxjs/toolkit';
import { fetchPosts, fetchMorePosts } from './postsThunks';

const initialState = {
  posts: [],
  status: 'idle',
  error: null,
  currentQuery: '',
  after: null,
  hasMore: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: (state) => {
      state.posts = [];
      state.currentQuery = '';
      state.after = null;
      state.hasMore = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload.posts;
        state.currentQuery = action.payload.query;
        state.after = action.payload.after;
        state.hasMore = action.payload.posts.length >= 20;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchMorePosts.pending, (state) => {
        state.status = 'loadingMore';
      })
      .addCase(fetchMorePosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = [...state.posts, ...action.payload.posts];
        state.after = action.payload.after;
        state.hasMore = action.payload.posts.length >= 20;
      })
      .addCase(fetchMorePosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearPosts } = postsSlice.actions;

export const selectAllPosts = (state) => state.posts.posts;
export const selectPostsStatus = (state) => state.posts.status;
export const selectPostsError = (state) => state.posts.error;
export const selectCurrentQuery = (state) => state.posts.currentQuery;
export const selectHasMorePosts = (state) => state.posts.hasMore;

export default postsSlice.reducer;