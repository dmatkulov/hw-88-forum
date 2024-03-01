import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  GlobalError,
  LoginMutation,
  LogOutMessage,
  RegisterMutation,
  RegisterResponse,
  ValidationError,
} from '../../types';
import axiosApi from '../../axiosApi';
import { isAxiosError } from 'axios';
import { routes } from '../../constants';
import { unsetUser } from './usersSlice';
import { RootState } from '../../app/store';

export const registerUser = createAsyncThunk<
  RegisterResponse,
  RegisterMutation,
  { rejectValue: ValidationError }
>('users/register', async (registerMutation, { rejectWithValue }) => {
  try {
    const response = await axiosApi.post(routes.register, registerMutation);
    return response.data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 422) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});

export const loginUser = createAsyncThunk<
  RegisterResponse,
  LoginMutation,
  { rejectValue: GlobalError }
>('users/login', async (loginMutation, { rejectWithValue }) => {
  try {
    const response = await axiosApi.post<RegisterResponse>(
      routes.login,
      loginMutation,
    );
    return response.data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 422) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});

export const logOutUser = createAsyncThunk<
  void,
  undefined,
  { state: RootState }
>('users/logout', async (_, { getState, dispatch }) => {
  const token = getState().users.user?.token;
  await axiosApi.delete<LogOutMessage>(routes.login, {
    headers: { Authorization: 'Bearer ' + token },
  });
  dispatch(unsetUser());
});
