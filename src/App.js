import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SearchResultsPage from './pages/SearchResultsPage';
import PostDetailPage from './pages/PostDetailPage';
import Layout from './components/Layout';
import { fetchTokenFromStorage } from './features/auth/authSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import AuthCallbackPage from './pages/AuthCallbackPage';

// Initialize auth state when app loads
const AppInitializer = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTokenFromStorage());
  }, [dispatch]);

  return children;
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppInitializer>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/search/:query" element={<SearchResultsPage />} />
              <Route path="/post/:postId" element={<PostDetailPage />} />
              <Route path="/auth/callback" element={<AuthCallbackPage />} />
            </Routes>
          </Layout>
        </AppInitializer>
      </Router>
    </Provider>
  );
}

export default App;