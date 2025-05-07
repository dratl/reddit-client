// src/reducers/postsReducer.js
import {
    FETCH_POSTS_REQUEST,
    FETCH_POSTS_SUCCESS,
    FETCH_POSTS_FAILURE,
    SEARCH_POSTS,
    SELECT_POST,
    FETCH_POST_DETAILS_REQUEST,
    FETCH_POST_DETAILS_SUCCESS,
    FETCH_POST_DETAILS_FAILURE,
  } from '../actions/postsActions';
  
  const initialState = {
    posts: [],
    currentSubreddit: 'all',
    searchQuery: '',
    selectedPost: null,
    postDetails: null,
    comments: [],
    loading: false,
    error: null,
  };
  
  const postsReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_POSTS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FETCH_POSTS_SUCCESS:
        return {
          ...state,
          posts: action.payload.posts,
          currentSubreddit: action.payload.subreddit,
          loading: false,
          error: null,
        };
      case FETCH_POSTS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case SEARCH_POSTS:
        return {
          ...state,
          searchQuery: action.payload,
        };
      case SELECT_POST:
        return {
          ...state,
          selectedPost: action.payload,
        };
      case FETCH_POST_DETAILS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FETCH_POST_DETAILS_SUCCESS:
        return {
          ...state,
          postDetails: action.payload.post,
          comments: action.payload.comments,
          loading: false,
          error: null,
        };
      case FETCH_POST_DETAILS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default postsReducer;