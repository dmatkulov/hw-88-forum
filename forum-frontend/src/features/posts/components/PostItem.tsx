import React from 'react';
import { Avatar, CardMedia, Grid, Stack, Typography } from '@mui/material';
import { Post } from '../../../types';
import { apiURL } from '../../../constants';
import PostBadge from './PostBadge';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

interface Props {
  post: Post;
}

const PostItem: React.FC<Props> = ({ post }) => {
  const navigate = useNavigate();
  const date = dayjs(post.datetime).format('dddd, HH:mm:ss');
  const postImage = apiURL + '/' + post.image;

  const readFullPost = () => {
    navigate('/posts/' + post._id);
  };

  return (
    <Grid
      container
      sx={{ borderBottom: '1px solid #eee', pb: 2, mb: 2 }}
      onClick={readFullPost}
    >
      <Grid
        container
        sx={{
          padding: 2,
          borderRadius: 4,
          '&:hover': {
            backgroundColor: '#F1F1F1',
            cursor: 'pointer',
          },
        }}
      >
        <Grid
          container
          item
          xs={12}
          justifyContent="space-between"
          alignItems="center"
          flex="row"
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <Avatar sx={{ width: 28, height: 28 }}>
              {post.user.username.charAt(0)}
            </Avatar>
            <Typography variant="subtitle1" fontWeight="bolder">
              {post.user.username}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {date}
            </Typography>
          </Stack>
          {!post.image && (
            <Grid item>
              <PostBadge />
            </Grid>
          )}
        </Grid>
        <Grid item xs={12}>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            flex="row"
          >
            <Grid item xs={7} flexGrow={1}>
              <Typography gutterBottom variant="h6" sx={{ flexGrow: 1 }}>
                {post.title}
              </Typography>
            </Grid>
            {post.image && (
              <Grid item xs={3} sx={{ overflow: 'hidden', borderRadius: 2 }}>
                <CardMedia
                  image={postImage}
                  sx={{
                    borderRadius: '6px',
                    width: '100%',
                    height: '150px',
                    backgroundColor: 'rgb(227,227,227)',
                  }}
                />
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PostItem;
