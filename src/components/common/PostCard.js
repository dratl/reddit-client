// src/components/common/PostCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './PostCard.css';

const PostCard = ({ post }) => {
  const formatNumber = (num) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num;
  };

  return (
    <article className="post-card">
      <div className="post-votes">
        <button className="upvote">↑</button>
        <span>{formatNumber(post.ups)}</span>
        <button className="downvote">↓</button>
      </div>
      
      <div className="post-content">
        <header className="post-header">
          <span className="post-subreddit">r/{post.subreddit}</span>
          <span className="post-author">Posted by u/{post.author}</span>
          <span className="post-time">
            {new Date(post.created_utc * 1000).toLocaleString()}
          </span>
        </header>
        
        <h3 className="post-title">
          <Link to={`/post/${post.subreddit}/${post.id}`}>{post.title}</Link>
        </h3>
        
        {post.thumbnail && post.thumbnail !== 'self' && (
          <div className="post-thumbnail">
            <img 
              src={post.thumbnail} 
              alt={post.title} 
              loading="lazy"
            />
          </div>
        )}
        
        <footer className="post-footer">
          <span className="post-comments">
            {formatNumber(post.num_comments)} comments
          </span>
          <a 
            href={`https://www.reddit.com${post.permalink}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="post-source"
          >
            View on Reddit
          </a>
        </footer>
      </div>
    </article>
  );
};

export default PostCard;