import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatNumber } from '../utils/format';

const PostCard = ({ post }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/post/${post.id}`);
  };

  return (
    <div
      className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow mb-4 cursor-pointer"
      onClick={handleClick}
    >
      {post.thumbnail && post.thumbnail !== 'self' && (
        <img
          src={post.thumbnail}
          alt={post.title}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
          }}
        />
      )}
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{post.title}</h3>
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <span>r/{post.subreddit}</span>
          <span className="mx-2">•</span>
          <span>u/{post.author}</span>
        </div>
        <div className="flex items-center text-sm">
          <span className="text-gray-700 mr-4">
            <span className="font-medium">{formatNumber(post.score)}</span> votes
          </span>
          <span className="text-gray-700">
            <span className="font-medium">{formatNumber(post.num_comments)}</span> comments
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;