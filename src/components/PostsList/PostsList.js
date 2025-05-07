// src/components/PostsList/PostsList.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { fetchPosts, searchRedditPosts } from '../../actions/postsActions';
import PostCard from '../common/PostCard';
import Pagination from '../common/Pagination';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import '../../styles/main.css';

const PostsList = () => {
  const dispatch = useDispatch();
  const { subreddit } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('q');
  
  const { 
    posts, 
    loading, 
    error, 
    currentSubreddit,
    searchQuery: storedQuery 
  } = useSelector((state) => state.posts);
  
  const [currentPage, setCurrentPage] = React.useState(1);
  const postsPerPage = 10;

  useEffect(() => {
    setCurrentPage(1); // Reset to first page when subreddit/search changes
    
    if (subreddit) {
      dispatch(fetchPosts(subreddit));
    } else if (searchQuery) {
      dispatch(searchRedditPosts(searchQuery));
    } else {
      dispatch(fetchPosts('all'));
    }
  }, [dispatch, subreddit, searchQuery]);

  // Get current posts for pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="posts-list-container">
      <h2 className="posts-list-header">
        {searchQuery 
          ? `Search results for "${storedQuery}"` 
          : `r/${currentSubreddit}`}
      </h2>
      
      <div className="posts-grid">
        {currentPosts.length > 0 ? (
          currentPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))
        ) : (
          <div className="no-posts">No posts found</div>
        )}
      </div>
      
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
};

export default PostsList;