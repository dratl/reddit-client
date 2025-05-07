// src/components/PostDetail/PostDetail.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPostDetails } from '../../actions/postsActions';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import CommentList from '../common/CommentList';
import '../../styles/main.css';

const PostDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id, subreddit } = useParams();
  
  const { 
    postDetails, 
    comments, 
    loading, 
    error 
  } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPostDetails(`/r/${subreddit}/comments/${id}`));
  }, [dispatch, id, subreddit]);

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!postDetails) return null;

  return (
    <div className="post-detail-container">
      <button onClick={handleBack} className="back-button">
        &larr; Back to posts
      </button>
      
      <article className="post-detail">
        <header className="post-header">
          <h2 className="post-title">{postDetails.title}</h2>
          <div className="post-meta">
            <span>Posted by u/{postDetails.author}</span>
            <span>in r/{postDetails.subreddit}</span>
            <span>{new Date(postDetails.created_utc * 1000).toLocaleString()}</span>
          </div>
        </header>
        
        <div className="post-content">
          {postDetails.selftext && (
            <div className="post-text">{postDetails.selftext}</div>
          )}
          
          {postDetails.url && !postDetails.is_self && (
            <div className="post-media">
              {postDetails.post_hint === 'image' ? (
                <img 
                  src={postDetails.url} 
                  alt={postDetails.title} 
                  loading="lazy"
                />
              ) : postDetails.post_hint === 'hosted:video' ? (
                <video controls>
                  <source src={postDetails.media.reddit_video.fallback_url} />
                </video>
              ) : (
                <a 
                  href={postDetails.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  {postDetails.url}
                </a>
              )}
            </div>
          )}
        </div>
        
        <footer className="post-footer">
          <div className="post-stats">
            <span>👍 {postDetails.ups.toLocaleString()} upvotes</span>
            <span>💬 {postDetails.num_comments.toLocaleString()} comments</span>
          </div>
        </footer>
      </article>
      
      <section className="comments-section">
        <h3>Comments ({comments.length})</h3>
        <CommentList comments={comments} />
      </section>
    </div>
  );
};

export default PostDetail;