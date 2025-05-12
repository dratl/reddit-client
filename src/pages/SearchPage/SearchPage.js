import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate, Routes, Route } from 'react-router-dom';
import { fetchPostsByQuery } from '../../api/redditApi';
import { selectAllPosts, selectPostsStatus, selectPostsError } from '../../features/posts/postsSlice';
import PostCard from '../../components/PostCard/PostCard';
import Navigation from '../../components/Navigation/Navigation';
import Loading from '../../components/Loading/Loading';
import Error from '../../components/Error/Error';
import PostDetail from '../../components/PostDetail/PostDetail';
import './SearchPage.css';

const SearchPage = () => {
  const { query } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const posts = useSelector(selectAllPosts);
  const status = useSelector(selectPostsStatus);
  const error = useSelector(selectPostsError);

  useEffect(() => {
    if (query) {
      dispatch(fetchPostsByQuery({ query }));
    }
  }, [dispatch, query]);

  if (status === 'loading') {
    return <Loading message={`Loading posts for "${decodeURIComponent(query)}"`} />;
  }

  if (status === 'failed') {
    return <Error message={error} retryFn={() => dispatch(fetchPostsByQuery({ query }))} />;
  }

  return (
    <div className="search-page">
      <Navigation />
      <div className="viewer-column">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h2 className="search-results-title">
                  Search Results for: {decodeURIComponent(query)}
                </h2>
                <div className="posts-grid">
                  {posts.length > 0 ? (
                    posts.map((post) => (
                      <PostCard
                        key={post.id}
                        post={post}
                        onClick={() => navigate(`/search/${query}/${post.id}`)}
                      />
                    ))
                  ) : (
                    <div className="no-posts">No posts found for this search.</div>
                  )}
                </div>
              </>
            }
          />
          <Route path="/:postId" element={<PostDetail />} />
        </Routes>
      </div>
    </div>
  );
};

export default SearchPage;