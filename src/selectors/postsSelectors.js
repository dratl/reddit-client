// src/selectors/postsSelectors.js
import { createSelector } from 'reselect';

const selectPostsState = (state) => state.posts;

export const selectCurrentPosts = createSelector(
  [selectPostsState],
  (posts) => posts.posts
);

export const selectCurrentSubreddit = createSelector(
  [selectPostsState],
  (posts) => posts.currentSubreddit
);

export const selectPostDetails = createSelector(
  [selectPostsState],
  (posts) => posts.postDetails
);

export const selectComments = createSelector(
  [selectPostsState],
  (posts) => posts.comments
);

export const selectLoadingState = createSelector(
  [selectPostsState],
  (posts) => posts.loading
);

export const selectErrorState = createSelector(
  [selectPostsState],
  (posts) => posts.error
);