// src/App.js (updated)
import React, { lazy, Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import store from './store';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import LoadingSpinner from './components/common/LoadingSpinner';
import './styles/main.css';

// Lazy load components
const HomeView = lazy(() => import('./components/HomeView/HomeView'));
const PostsList = lazy(() => import('./components/PostsList/PostsList'));
const PostDetail = lazy(() => import('./components/PostDetail/PostDetail'));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <Header />
          <div className="app-content">
            <Sidebar />
            <main className="main-content">
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  <Route path="/" element={<HomeView />} />
                  <Route path="/r/:subreddit" element={<PostsList />} />
                  <Route path="/post/:subreddit/:id" element={<PostDetail />} />
                  <Route path="/search" element={<PostsList />} />
                </Routes>
              </Suspense>
            </main>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;