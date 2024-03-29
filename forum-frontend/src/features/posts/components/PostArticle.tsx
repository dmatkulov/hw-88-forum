import React from 'react';
import dayjs from 'dayjs';
import { Avatar, Box, Typography } from '@mui/material';
import { useAppSelector } from '../../../app/hooks';
import { selectCommentCount } from '../../comments/commentsSlice';

import { PostApi } from '../../../types';
import { apiURL } from '../../../constants';
import PostBadge from './PostBadge';

interface Props {
  post: PostApi;
}

const PostArticle: React.FC<Props> = ({ post }) => {
  const postImage = apiURL + '/' + post.image;
  const date = dayjs(post.datetime).format('dddd, HH:mm:ss');
  const count = useAppSelector(selectCommentCount);

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Avatar sx={{ width: 28, height: 28, mr: 1 }}>
          {post.user.username.charAt(0)}
        </Avatar>
        <Box
          sx={{
            display: 'flex',
            flexGrow: 1,
          }}
          alignItems="center"
          justifyContent="center"
        >
          <Typography
            sx={{ flexGrow: 1 }}
            variant="subtitle1"
            fontWeight="bolder"
          >
            {post.user.username}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {date}
          </Typography>
        </Box>
      </Box>
      {!post.image && <PostBadge />}
      <Typography variant="h4" component="h1" gutterBottom mb={6} mt={3}>
        {post.title}
      </Typography>

      <Typography
        color="gray"
        fontSize="small"
        bgcolor="#eeeeee"
        display="inline-block"
        px={2}
        borderRadius={3}
        mb={3}
      >
        {count > 0 ? `${count} comment(s)` : 'No comments'}
      </Typography>

      {post.description && (
        <Box>
          <Typography variant="body1" gutterBottom mb={4}>
            {post.description}
          </Typography>
        </Box>
      )}
      {post.image && (
        <Box sx={{ height: '450px', overflow: 'hidden', borderRadius: '12px' }}>
          <img
            src={postImage}
            alt={post.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </Box>
      )}
    </>
  );
};

export default PostArticle;
