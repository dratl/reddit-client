// src/components/Sidebar/Sidebar.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../actions/postsActions';
import './Sidebar.css';

const Sidebar = () => {
  const dispatch = useDispatch();
  const { sidebarOpen } = useSelector((state) => state.ui);
  const predefinedSubreddits = [
    { name: 'popular', display: 'Popular' },
    { name: 'all', display: 'All' },
    { name: 'javascript', display: 'JavaScript' },
    { name: 'reactjs', display: 'React' },
    { name: 'webdev', display: 'Web Dev' },
    { name: 'programming', display: 'Programming' },
    { name: 'news', display: 'News' },
    { name: 'worldnews', display: 'World News' },
  ];

  const handleSubredditClick = (subreddit) => {
    dispatch(fetchPosts(subreddit));
  };

  if (!sidebarOpen) return null;

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h3>Subreddits</h3>
      </div>
      
      <nav className="subreddit-nav">
        <ul>
          {predefinedSubreddits.map((subreddit) => (
            <li key={subreddit.name}>
              <button
                onClick={() => handleSubredditClick(subreddit.name)}
                className="subreddit-link"
              >
                {subreddit.display}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="sidebar-footer">
        <p>Reddit Client App</p>
      </div>
    </aside>
  );
};

export default Sidebar;