import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostsByQuery, selectPosts } from '../features/posts/postsSlice';
import { setCurrentQuery } from '../features/search/searchSlice';
import PostCard from '../components/PostCard';
import Pagination from '../components/Pagination';

const SearchResultsPage = () => {
  const { query } = useParams();
  const decodedQuery = decodeURIComponent(query);
  const dispatch = useDispatch();
  const { items, isLoading, error, after } = useSelector(selectPosts);
  const [currentPage, setCurrentPage] = useState(1);
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    dispatch(setCurrentQuery(decodedQuery));
    dispatch(fetchPostsByQuery({ query: decodedQuery }));
    setCurrentPage(1);
    setAllPosts([]);
  }, [dispatch, decodedQuery]);

  useEffect(() => {
    if (items.length > 0) {
      setAllPosts((prevPosts) => {
        if (currentPage === 1) {
          return items;
        }
        return [...prevPosts, ...items];
      });
    }
  }, [items, currentPage]);

  const loadMore = () => {
    dispatch(fetchPostsByQuery({ query: decodedQuery, after }));
  };

  const handlePageChange = (page) => {
    if (page > currentPage && !after) return; // No more pages to load
    if (page > currentPage) {
      loadMore();
    }
    setCurrentPage(page);
  };

  // Calculate total pages based on the number of posts and pagination logic
  const postsPerPage = 20;
  const totalPages = Math.ceil(allPosts.length / postsPerPage) + (after ? 1 : 0);

  // Get current posts for the current page
  const currentPosts = allPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Search Results for "{decodedQuery}"</h2>
      
      {isLoading && currentPosts.length === 0 && (
        <div className="text-center py-8">Loading posts...</div>
      )}
      
      {error && (
        <div className="text-center py-8 text-red-500">{error}</div>
      )}
      
      {!isLoading && currentPosts.length === 0 && !error && (
        <div className="text-center py-8">No posts found for this search query</div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      
      {allPosts.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default SearchResultsPage;