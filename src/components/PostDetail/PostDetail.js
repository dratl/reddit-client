import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPostDetails } from '../../services/redditApi';
import { getCacheKey, getCached, setCached } from '../../services/cache';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import CommentList from '../common/CommentList';

const PostDetail = () => {
  const { subreddit, id } = useParams();
  const [postData, setPostData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPost = async () => {
      setIsLoading(true);
      setError(null);
      const permalink = `/r/${subreddit}/comments/${id}`;

      try {
        const cacheKey = getCacheKey(permalink);
        const cachedData = getCached(cacheKey);

        if (cachedData) {
          setPostData(cachedData);
        } else {
          const data = await fetchPostDetails(permalink);
          setCached(cacheKey, data);
          setPostData(data);
        }
      } catch (err) {
        if (err.response?.status === 429) {
          setError({
            message: 'Rate limited. Please wait before reloading.',
            isRateLimit: true
          });
        } else {
          setError({
            message: 'Failed to load post details.',
            isRateLimit: false
          });
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadPost();
  }, [subreddit, id]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!postData) return null;

  return (
    <div className="post-detail">
      <article className="post-content">
        {/* Post content rendering */}
      </article>
      <CommentList comments={postData.comments} />
    </div>
  );
};

export default PostDetail;