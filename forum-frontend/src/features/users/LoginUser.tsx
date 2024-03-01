import React, { useEffect, useState } from 'react';
import { LoginMutation } from '../../types';
import {
  Avatar,
  Box,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { LockOpen } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  resetMessages,
  selectLoginError,
  selectLoginLoading,
  selectLoginMessage,
} from './usersSlice';
import { LoadingButton } from '@mui/lab';
import { loginUser } from './usersThunks';
import ErrorAlert from '../../components/IU/Alerts/ErrorAlert';
import SuccessAlert from '../../components/IU/Alerts/SuccessAlert';

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectLoginError);
  const loading = useAppSelector(selectLoginLoading);
  const loginMessage = useAppSelector(selectLoginMessage);

  const [state, setState] = useState<LoginMutation>({
    username: '',
    password: '',
  });

  useEffect(() => {
    dispatch(resetMessages());
  }, [dispatch]);

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    await dispatch(loginUser(state)).unwrap();
  };

  let formField: React.ReactNode;

  if (loginMessage) {
    formField = (
      <Grid container justifyContent="center" direction="column" gap={2}>
        <SuccessAlert message={loginMessage} />
      </Grid>
    );
  } else {
    formField = (
      <Box component="form" onSubmit={submitFormHandler} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Username"
              name="username"
              value={state.username}
              onChange={inputChangeHandler}
              autoComplete="current-username"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="password"
              label="Password"
              type="password"
              value={state.password}
              onChange={inputChangeHandler}
              autoComplete="current-password"
            />
          </Grid>
        </Grid>
        <Grid item xs={12} textAlign="center">
          <LoadingButton
            type="submit"
            loading={loading}
            color={'info'}
            disableElevation
            sx={{ mt: 3, mb: 2, py: 1 }}
            disabled={loading}
            variant="contained"
          >
            Sign In
          </LoadingButton>
        </Grid>
        <Grid container justifyContent="center">
          <Grid item>
            <Link component={RouterLink} to="/register" variant="body2">
              New user? Sign Up
            </Link>
          </Grid>
        </Grid>
      </Box>
    );
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOpen />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {error && <ErrorAlert message={error.error} />}

        {formField}
      </Box>
    </Container>
  );
};

export default Login;
