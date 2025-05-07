// src/actions/postsActions.js
import * as api from '../services/redditApi';

// Action types
export const FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';
export const SEARCH_POSTS = 'SEARCH_POSTS';
export const SELECT_POST = 'SELECT_POST';
export const FETCH_POST_DETAILS_REQUEST = 'FETCH_POST_DETAILS_REQUEST';
export const FETCH_POST_DETAILS_SUCCESS = 'FETCH_POST_DETAILS_SUCCESS';
export const FETCH_POST_DETAILS_FAILURE = 'FETCH_POST_DETAILS_FAILURE';

// Action creators
export const fetchPostsRequest = () => ({
  type: FETCH_POSTS_REQUEST,
});

export const fetchPostsSuccess = (posts, subreddit) => ({
  type: FETCH_POSTS_SUCCESS,
  payload: { posts, subreddit },
});

export const fetchPostsFailure = (error) => ({
  type: FETCH_POSTS_FAILURE,
  payload: error,
});

export const searchPosts = (query) => ({
  type: SEARCH_POSTS,
  payload: query,
});

export const selectPost = (post) => ({
  type: SELECT_POST,
  payload: post,
});

// Thunk action for fetching posts
export const fetchPosts = (subreddit = 'all', sort = 'hot') => {
  return async (dispatch) => {
    dispatch(fetchPostsRequest());
    try {
      const posts = await api.fetchPosts(subreddit, sort);
      dispatch(fetchPostsSuccess(posts, subreddit));
    } catch (error) {
      dispatch(fetchPostsFailure(error.message));
    }
  };
};

// Thunk action for searching posts
export const searchRedditPosts = (query, sort = 'relevance') => {
  return async (dispatch) => {
    dispatch(fetchPostsRequest());
    try {
      const posts = await api.searchPosts(query, sort);
      dispatch(fetchPostsSuccess(posts, `search:${query}`));
      dispatch(searchPosts(query));
    } catch (error) {
      dispatch(fetchPostsFailure(error.message));
    }
  };
};

// Thunk action for fetching post details
export const fetchPostDetails = (permalink) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_POST_DETAILS_REQUEST });
    try {
      const { post, comments } = await api.fetchPostDetails(permalink);
      dispatch({
        type: FETCH_POST_DETAILS_SUCCESS,
        payload: { post, comments },
      });
    } catch (error) {
      dispatch({
        type: FETCH_POST_DETAILS_FAILURE,
        payload: error.message,
      });
    }
  };
};