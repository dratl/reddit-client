// src/App.js
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store from './store';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import HomeView from './components/HomeView/HomeView';
import PostsList from './components/PostsList/';
import PostDetail from './components/PostDetail';
import './styles/main.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <Header />
          <div className="app-content">
            <Sidebar />
            <main className="main-content">
              <Switch>
                <Route exact path="/" component={HomeView} />
                <Route path="/r/:subreddit" component={PostsList} />
                <Route path="/post/:subreddit/:id" component={PostDetail} />
                <Route path="/search" component={PostsList} />
              </Switch>
            </main>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;