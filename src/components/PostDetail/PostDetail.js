import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAllPosts } from '../../features/posts/postsSlice';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import './PostDetail.css';

const PostDetail = () => {
  const { postId } = useParams();
  const posts = useSelector(selectAllPosts);
  const post = posts.find(p => p.id === postId);

  if (!post) {
    return <div className="post-not-found">Post not found</div>;
  }

  return (
    <div className="post-detail-container">
      <Card className="post-detail-card">
        {post.thumbnail && post.thumbnail !== 'self' && (
          <CardMedia
            component="img"
            height="300"
            image={post.thumbnail}
            alt={post.title}
          />
        )}
        <CardContent>
          <Typography gutterBottom variant="h4" component="h1">
            {post.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Posted by {post.author} in{' '}
            <a href={`https://reddit.com/r/${post.subreddit}`} target="_blank" rel="noopener noreferrer">
              r/{post.subreddit}
            </a>
          </Typography>
          <Typography variant="body1" paragraph className="post-text">
            {post.selftext || 'No text content available.'}
          </Typography>
          <div className="post-meta">
            <span className="post-stat">▲ {post.ups} upvotes</span>
            <span className="post-stat">💬 {post.num_comments} comments</span>
            <span className="post-stat">📅 {new Date(post.created_utc * 1000).toLocaleDateString()}</span>
          </div>
          <Button
            variant="contained"
            color="primary"
            href={`https://reddit.com${post.permalink}`}
            target="_blank"
            rel="noopener noreferrer"
            className="view-on-reddit"
          >
            View on Reddit
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PostDetail;