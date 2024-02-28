import React, { useCallback, useEffect } from 'react';
import PostArticle from '../components/PostArticle';
import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectOnePostLoading, selectPost } from './postsSlice';
import { fetchSinglePost } from './postsThunks';
import LoadingPage from '../../components/IU/LoadingPage/LoadingPage';

const FullPost: React.FC = () => {
  const { id } = useParams() as { id: string };

  const dispatch = useAppDispatch();
  const post = useAppSelector(selectPost);
  const loading = useAppSelector(selectOnePostLoading);

  const fetchPost = useCallback(async () => {
    await dispatch(fetchSinglePost(id));
  }, []);

  useEffect(() => {
    void fetchPost();
  }, [fetchPost]);

  return (
    <>
      <Box>
        {loading && <LoadingPage />}
        {post && <PostArticle post={post} />}
      </Box>
    </>
  );
};

export default FullPost;
