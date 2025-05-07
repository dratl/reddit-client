// src/App.js (updated)
import React, { lazy, Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store from './store';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import LoadingSpinner from './components/common/LoadingSpinner';
import './styles/main.css';

// Lazy load components
const HomeView = lazy(() => import('./components/HomeView'));
const PostsList = lazy(() => import('./components/PostsList'));
const PostDetail = lazy(() => import('./components/PostDetail'));

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
                <Switch>
                  <Route exact path="/" component={HomeView} />
                  <Route path="/r/:subreddit" component={PostsList} />
                  <Route path="/post/:subreddit/:id" component={PostDetail} />
                  <Route path="/search" component={PostsList} />
                </Switch>
              </Suspense>
            </main>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;