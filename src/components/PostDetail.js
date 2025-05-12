import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatNumber } from '../utils/format';
import { useSelector } from 'react-redux';
import { selectPosts } from '../features/posts/postsSlice';

const PostDetail = () => {
  const navigate = useNavigate();
  const { currentPost, isLoading, error } = useSelector(selectPosts);

  if (isLoading) return <div className="text-center py-8">Loading post...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
  if (!currentPost) return <div className="text-center py-8">No post data available</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 flex items-center text-blue-500 hover:text-blue-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        Back to results
      </button>

      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-4">{currentPost.title}</h1>
        
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <span>Posted in r/{currentPost.subreddit}</span>
          <span className="mx-2">•</span>
          <span>by u/{currentPost.author}</span>
          <span className="mx-2">•</span>
          <span>{new Date(currentPost.created_utc * 1000).toLocaleDateString()}</span>
        </div>

        {currentPost.selftext && (
          <div className="prose max-w-none mb-6">
            <p>{currentPost.selftext}</p>
          </div>
        )}

        {currentPost.url && !currentPost.is_self && (
          <div className="mb-6">
            {currentPost.is_video ? (
              <video controls className="w-full max-h-96">
                <source src={currentPost.media.reddit_video.fallback_url} type="video/mp4" />
              </video>
            ) : currentPost.post_hint === 'image' ? (
              <img
                src={currentPost.url}
                alt={currentPost.title}
                className="w-full max-h-96 object-contain"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/600x400?text=Image+Not+Available';
                }}
              />
            ) : (
              <a
                href={currentPost.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                View external content
              </a>
            )}
          </div>
        )}

        <div className="flex items-center space-x-6 text-sm">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1 text-gray-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-medium">{formatNumber(currentPost.score)}</span>
          </div>
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1 text-gray-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-medium">{formatNumber(currentPost.num_comments)}</span>
          </div>
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1 text-gray-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                clipRule="evenodd"
              />
            </svg>
            <span>{new Date(currentPost.created_utc * 1000).toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;