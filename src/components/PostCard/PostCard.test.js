// src/components/PostCard/PostCard.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import PostCard from './PostCard';

const mockPost = {
  id: '1',
  title: 'Test Post',
  author: 'testuser',
  subreddit: 'testing',
  created_utc: Date.now() / 1000,
  ups: 1000,
  num_comments: 42,
  permalink: '/r/testing/comments/1/test_post/',
  thumbnail: 'https://example.com/image.jpg',
};

describe('PostCard', () => {
  it('renders post title', () => {
    render(<PostCard post={mockPost} />);
    expect(screen.getByText(mockPost.title)).toBeInTheDocument();
  });

  it('renders formatted upvote count', () => {
    render(<PostCard post={mockPost} />);
    expect(screen.getByText('1.0k')).toBeInTheDocument();
  });

  it('renders comment count', () => {
    render(<PostCard post={mockPost} />);
    expect(screen.getByText('42 comments')).toBeInTheDocument();
  });
});