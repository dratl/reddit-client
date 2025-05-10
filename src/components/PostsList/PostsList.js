import { useCallback, useState, useEffect } from 'react';
import { fetchPosts } from '../../services/redditApi';
import { getCacheKey, getCached, setCached } from '../../services/cache';
import PostCard from '../common/PostCard';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import Pagination from '../common/Pagination';

const PostsList = ({ subreddit = 'all', sort = 'hot' }) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const cacheKey = getCacheKey(`r/${subreddit}/${sort}`, { limit: 25 });
      const cachedData = getCached(cacheKey);
      
      if (cachedData) {
        setPosts(cachedData);
      } else {
        const data = await fetchPosts(subreddit, sort, 25);
        setCached(cacheKey, data);
        setPosts(data);
      }
    } catch (err) {
      if (err.response?.status === 429) {
        setError({
          message: 'Too many requests. Please wait a minute and try again.',
          isRateLimit: true
        });
      } else {
        setError({
          message: 'Failed to load posts. Please try again later.',
          isRateLimit: false
        });
      }
    } finally {
      setIsLoading(false);
    }
  }, [subreddit, sort]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage 
                      message={error.message} 
                      onRetry={error.isRateLimit ? fetchData : null} 
                    />;

  return (
    <div className="posts-list">
      {currentPosts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        currentPage={currentPage}
        paginate={setCurrentPage}
      />
    </div>
  );
};

export default PostsList;