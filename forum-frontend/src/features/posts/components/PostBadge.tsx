import { Stack, Typography } from '@mui/material';
import React from 'react';
import ForumIcon from '@mui/icons-material/Forum';

const PostBadge: React.FC = () => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1}
      px={1}
      py={0.4}
      sx={{ bgcolor: 'coral', borderRadius: 4, color: 'white' }}
    >
      <ForumIcon fontSize="small" color="inherit" />{' '}
      <Typography variant="body2" fontSize="small">
        Discussion
      </Typography>
    </Stack>
  );
};

export default PostBadge;
