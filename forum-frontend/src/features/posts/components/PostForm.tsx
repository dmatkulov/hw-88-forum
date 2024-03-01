import React, { useState } from 'react';
import { Box, Grid, TextField } from '@mui/material';
import FileInput from '../../../components/IU/FileInput/FileInput';
import { PostMutation } from '../../../types';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectCreatePostError, selectCreatePostLoading } from '../postsSlice';
import { createPost } from '../postsThunks';
import { useNavigate } from 'react-router-dom';

const PostForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const creating = useAppSelector(selectCreatePostLoading);
  const error = useAppSelector(selectCreatePostError);

  const [state, setState] = useState<PostMutation>({
    title: '',
    description: '',
    image: null,
  });

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  const onSubmitPost = async (event: React.FormEvent) => {
    event.preventDefault();

    await dispatch(createPost(state)).unwrap();
    navigate('/');
  };

  return (
    <>
      <Box component="form" onSubmit={onSubmitPost}>
        <Grid container item xs={6} direction="column" spacing={2} mx="auto">
          <Grid item xs>
            <TextField
              fullWidth
              label="Title"
              name="title"
              type="title"
              value={state.title}
              onChange={inputChangeHandler}
              error={Boolean(getFieldError('title'))}
              helperText={getFieldError('title')}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              type="description"
              multiline
              rows={4}
              value={state.description}
              onChange={inputChangeHandler}
              error={Boolean(getFieldError('description'))}
              helperText={getFieldError('description')}
            />
          </Grid>
          <Grid item xs={6}>
            <FileInput
              getFieldError={getFieldError}
              onChange={fileInputChangeHandler}
            />
          </Grid>

          <Grid item xs={3} textAlign="center">
            <LoadingButton
              type="submit"
              fullWidth
              loading={creating}
              color={'info'}
              disableElevation
              sx={{ mt: 3, mb: 2, py: 1 }}
              disabled={creating}
              variant="contained"
            >
              Create
            </LoadingButton>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default PostForm;
