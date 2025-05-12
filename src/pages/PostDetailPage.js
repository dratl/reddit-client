import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchPostById } from '../features/posts/postsSlice';
import PostDetail from '../components/PostDetail';

const PostDetailPage = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPostById(postId));
  }, [dispatch, postId]);

  return <PostDetail />;
};

export default PostDetailPage;