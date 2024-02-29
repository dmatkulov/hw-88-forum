import React from 'react';
import { CircularProgress, Grid, Typography } from '@mui/material';
import { useAppSelector } from '../../../app/hooks';
import { selectCommentsLoading } from '../commentsSlice';

interface Props {
  user: string;
  text: string;
}

const CommentItem: React.FC<Props> = ({ user, text }) => {
  const loading = useAppSelector(selectCommentsLoading);

  return (
    <>
      <Grid container sx={{ borderBottom: '1px solid #eee', pb: 2, mb: 2 }}>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <Typography gutterBottom variant="body2" color="text.secondary">
              {user}
            </Typography>

            <Grid item xs={12}>
              <Typography gutterBottom variant="body1" sx={{ flexGrow: 1 }}>
                {text}
              </Typography>
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
};

export default CommentItem;
