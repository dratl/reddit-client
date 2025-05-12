import React from 'react';
import { render, screen } from '@testing-library/react';
import PostCard from './PostCard';

const mockPost = {
  id: '123',
  title: 'Test Post',
  author: 'testuser',
  subreddit: 'test',
  thumbnail: 'https://example.com/image.jpg',
  ups: 100,
  num_comments: 25,
  permalink: '/r/test/comments/123/test_post/',
};

describe('PostCard', () => {
  it('renders post information correctly', () => {
    render(<PostCard post={mockPost} />);
    
    expect(screen.getByText(mockPost.title)).toBeInTheDocument();
    expect(screen.getByText(`Posted by ${mockPost.author} in`)).toBeInTheDocument();
    expect(screen.getByText(`▲ ${mockPost.ups} upvotes`)).toBeInTheDocument();
    expect(screen.getByText(`💬 ${mockPost.num_comments} comments`)).toBeInTheDocument();
    expect(screen.getByAltText(mockPost.title)).toBeInTheDocument();
  });

  it('renders without thumbnail if not provided', () => {
    const postWithoutThumbnail = { ...mockPost, thumbnail: 'self' };
    render(<PostCard post={postWithoutThumbnail} />);
    
    expect(screen.queryByAltText(mockPost.title)).not.toBeInTheDocument();
  });
});