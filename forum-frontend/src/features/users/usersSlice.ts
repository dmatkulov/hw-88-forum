import { GlobalError, User, ValidationError } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { loginUser, logOutUser, registerUser } from './usersThunks';

interface UsersState {
  user: User | null;
  registerMessage: string | null;
  registerLoading: boolean;
  registerError: ValidationError | null;
  loginMessage: string | null;
  loginLoading: boolean;
  loginError: GlobalError | null;
  logOutLoading: boolean;
  logOutMessage: string | null;
}

const initialState: UsersState = {
  user: null,
  registerMessage: null,
  registerLoading: false,
  registerError: null,
  loginMessage: null,
  loginLoading: false,
  loginError: null,
  logOutLoading: false,
  logOutMessage: null,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    unsetUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.registerLoading = true;
        state.registerError = null;
      })
      .addCase(registerUser.fulfilled, (state, { payload: data }) => {
        state.registerLoading = false;
        state.user = data.user;
        state.registerMessage = data.message;
      })
      .addCase(registerUser.rejected, (state, { payload: error }) => {
        state.registerLoading = false;
        state.registerError = error || null;
      });

    builder
      .addCase(loginUser.pending, (state) => {
        state.loginLoading = true;
        state.loginError = null;
      })
      .addCase(loginUser.fulfilled, (state, { payload: data }) => {
        state.loginLoading = false;
        state.user = data.user;
        state.loginMessage = data.message;
      })
      .addCase(loginUser.rejected, (state, { payload: error }) => {
        state.loginLoading = false;
        state.loginError = error || null;
      });

    builder
      .addCase(logOutUser.pending, (state) => {
        state.logOutLoading = true;
      })
      .addCase(logOutUser.fulfilled, (state, { payload: response }) => {
        state.logOutLoading = false;
        state.logOutMessage = response.message;
      })
      .addCase(logOutUser.rejected, (state) => {
        state.logOutLoading = false;
      });
  },
});

export const usersReducer = usersSlice.reducer;
export const { unsetUser } = usersSlice.actions;
export const selectUser = (state: RootState) => state.users.user;
export const selectRegisterMessage = (state: RootState) =>
  state.users.registerMessage;
export const selectRegisterLoading = (state: RootState) =>
  state.users.registerLoading;
export const selectRegisterError = (state: RootState) =>
  state.users.registerError;

export const selectLoginMessage = (state: RootState) =>
  state.users.loginMessage;
export const selectLoginLoading = (state: RootState) =>
  state.users.loginLoading;
export const selectLoginError = (state: RootState) => state.users.loginError;
export const selectLogOutLoading = (state: RootState) =>
  state.users.logOutLoading;
export const selectLogOutMessage = (state: RootState) =>
  state.users.logOutMessage;
