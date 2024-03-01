import React from 'react';
import { Box, Typography } from '@mui/material';
import PostForm from './components/PostForm';
import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../users/usersSlice';
import { Navigate } from 'react-router-dom';

const NewPost: React.FC = () => {
  const user = useAppSelector(selectUser);

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <Box>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        mb={6}
        mt={3}
        textAlign="center"
      >
        Create new post
      </Typography>
      <PostForm />
    </Box>
  );
};

export default NewPost;
