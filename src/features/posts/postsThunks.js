import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPostsByQuery as fetchPostsFromAPI } from '../../api/redditApi';
import axios from 'axios';

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async ({ query, limit = 20 }, { rejectWithValue }) => {
    try {
      const posts = await fetchPostsFromAPI(query, limit);
      return { posts, query };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchMorePosts = createAsyncThunk(
  'posts/fetchMorePosts',
  async ({ query, limit = 20, after }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://www.reddit.com/search.json?q=${query}&limit=${limit}&after=${after}`);
      const newPosts = response.data.data.children.map(post => post.data);
      return {
        posts: newPosts,
        after: response.data.data.after,
        query
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);