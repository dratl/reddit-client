import { createSlice } from '@reduxjs/toolkit';
import { fetchPostsByQuery } from '../../api/redditApi';

const initialState = {
  posts: [],
  status: 'idle',
  error: null,
  currentQuery: '',
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: (state) => {
      state.posts = [];
      state.currentQuery = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsByQuery.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPostsByQuery.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
        state.currentQuery = action.meta.arg.query;
      })
      .addCase(fetchPostsByQuery.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { clearPosts } = postsSlice.actions;

export const selectAllPosts = (state) => state.posts.posts;
export const selectPostsStatus = (state) => state.posts.status;
export const selectPostsError = (state) => state.posts.error;
export const selectCurrentQuery = (state) => state.posts.currentQuery;

export default postsSlice.reducer;