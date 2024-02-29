import React, { useState } from 'react';
import { Avatar, Grid, IconButton, Stack, TextField } from '@mui/material';
import { useAppSelector } from '../../../app/hooks';
import { selectCommentCreating, selectCreateError } from '../commentsSlice';
import { CommentBody } from '../../../types';
import SendIcon from '@mui/icons-material/Send';
import { deepOrange } from '@mui/material/colors';

interface Props {
  username: string;
  onSubmit: (comment: CommentBody) => void;
}

const CommentForm: React.FC<Props> = ({ username, onSubmit }) => {
  const [state, setState] = useState<CommentBody>({
    text: '',
  });

  const isCreating = useAppSelector(selectCommentCreating);
  const error = useAppSelector(selectCreateError);
  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    onSubmit(state);
    setState({
      text: '',
    });
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const getFieldError = () => {
    try {
      return error?.error;
    } catch {
      return undefined;
    }
  };

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Avatar sx={{ width: 24, height: 24, bgcolor: deepOrange[200] }}>
        {username}
      </Avatar>
      <Grid
        container
        component="form"
        onSubmit={submitFormHandler}
        justifyContent="space-between"
      >
        <Grid item flexGrow={1} mr={1}>
          <TextField
            fullWidth
            name="text"
            size="medium"
            variant="standard"
            placeholder="Leave a comment"
            value={state.text}
            onChange={inputChangeHandler}
            error={Boolean(getFieldError())}
            helperText={getFieldError()}
          />
        </Grid>
        <Grid item>
          <IconButton disabled={isCreating} type="submit">
            <SendIcon color="info" />
          </IconButton>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default CommentForm;
