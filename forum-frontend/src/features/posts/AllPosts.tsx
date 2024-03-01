import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectPosts, selectPostsLoading } from './postsSlice';
import { fetchPosts } from './postsThunks';
import LoadingPage from '../../components/IU/LoadingPage/LoadingPage';
import PostItem from './components/PostItem';
import { Box, Typography } from '@mui/material';

const AllPosts: React.FC = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);
  const loading = useAppSelector(selectPostsLoading);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <>
      {loading && <LoadingPage />}
      <Box>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            borderBottom: '1px solid #eee',
            mb: '24px',
            pb: 2,
          }}
        >
          Recent posts
        </Typography>
        {posts.length > 0 &&
          posts.map((post) => <PostItem key={post._id} post={post} />)}
      </Box>
    </>
  );
};

export default AllPosts;
