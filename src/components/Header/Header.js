// src/components/Header/Header.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { searchRedditPosts } from '../../actions/postsActions';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      dispatch(searchRedditPosts(searchQuery));
      history.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <a href="/">Reddit Client</a>
        </div>
        
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search Reddit..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
        
        <div className="user-actions">
          <button className="theme-toggle">Toggle Theme</button>
        </div>
      </div>
    </header>
  );
};

export default Header;