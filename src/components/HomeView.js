// src/components/HomeView.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../actions/postsActions';
import SubredditChart from './Charts/SubredditChart';

const HomeView = () => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.posts);
  const predefinedSubreddits = ['javascript', 'reactjs', 'webdev', 'programming', 'css'];

  useEffect(() => {
    // Fetch posts from predefined subreddits when component mounts
    predefinedSubreddits.forEach(subreddit => {
      dispatch(fetchPosts(subreddit, 'hot', 5));
    });
  }, [dispatch]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="home-view">
      <h1>Reddit Client</h1>
      <p>Browse popular subreddits or search for specific content</p>
      
      <div className="chart-container">
        <h2>Popular Subreddits Activity</h2>
        <SubredditChart subreddits={predefinedSubreddits} />
      </div>
      
      <div className="predefined-subreddits">
        <h2>Browse Popular Subreddits</h2>
        <div className="subreddit-list">
          {predefinedSubreddits.map(subreddit => (
            <div key={subreddit} className="subreddit-card">
              <h3>r/{subreddit}</h3>
              <a href={`/r/${subreddit}`} className="btn">View Posts</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeView;