import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import './PostCard.css';

const PostCard = ({ post, onClick }) => {
  return (
    <Card className="post-card" onClick={onClick}>
      {post.thumbnail && post.thumbnail !== 'self' && (
        <CardMedia
          component="img"
          height="140"
          image={post.thumbnail}
          alt={post.title}
        />
      )}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {post.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Posted by {post.author} in r/{post.subreddit}
        </Typography>
        <div className="post-stats">
          <span>▲ {post.ups} upvotes</span>
          <span>💬 {post.num_comments} comments</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;