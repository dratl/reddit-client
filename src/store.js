import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import postsReducer from './features/posts/postsSlice';
import searchReducer from './features/search/searchSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});