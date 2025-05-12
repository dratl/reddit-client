import React from 'react';
import { render, screen } from '@testing-library/react';
import PostCard from '../components/PostCard';
import { MemoryRouter } from 'react-router-dom';

const mockPost = {
  id: '1',
  title: 'Test Post Title',
  subreddit: 'testsubreddit',
  author: 'testuser',
  score: 1000,
  num_comments: 50,
  thumbnail: 'https://test.com/image.jpg',
};

describe('PostCard', () => {
  it('renders post information correctly', () => {
    render(
      <MemoryRouter>
        <PostCard post={mockPost} />
      </MemoryRouter>
    );

    expect(screen.getByText(mockPost.title)).toBeInTheDocument();
    expect(screen.getByText(`r/${mockPost.subreddit}`)).toBeInTheDocument();
    expect(screen.getByText(`u/${mockPost.author}`)).toBeInTheDocument();
    expect(screen.getByText('1K votes')).toBeInTheDocument();
    expect(screen.getByText('50 comments')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', mockPost.thumbnail);
  });

  it('handles missing thumbnail', () => {
    const postWithoutThumbnail = { ...mockPost, thumbnail: 'self' };
    render(
      <MemoryRouter>
        <PostCard post={postWithoutThumbnail} />
      </MemoryRouter>
    );

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});