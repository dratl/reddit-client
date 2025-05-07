// src/store.js
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// Import reducers
import postsReducer from './reducers/postsReducer';
import uiReducer from './reducers/uiReducer';

const rootReducer = combineReducers({
  posts: postsReducer,
  ui: uiReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;