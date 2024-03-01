import { Comment, GlobalError } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchComments, submitComment } from './commentsThunks';

interface CommentsState {
  items: Comment[];
  count: number;
  fetchLoading: boolean;
  isCreating: boolean;
  createError: GlobalError | null;
}

const initialState: CommentsState = {
  items: [],
  count: 0,
  fetchLoading: false,
  isCreating: false,
  createError: null,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchComments.fulfilled, (state, { payload: data }) => {
        state.fetchLoading = false;
        state.items = data.comments;
        state.count = data.count;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.fetchLoading = false;
      });
    builder
      .addCase(submitComment.pending, (state) => {
        state.isCreating = true;
        state.createError = null;
      })
      .addCase(submitComment.fulfilled, (state) => {
        state.isCreating = false;
      })
      .addCase(submitComment.rejected, (state, { payload: error }) => {
        state.isCreating = false;
        state.createError = error || null;
      });
  },
});

export const commentsReducer = commentsSlice.reducer;

export const selectComments = (state: RootState) => state.comments.items;
export const selectCommentCount = (state: RootState) => state.comments.count;
export const selectCommentsLoading = (state: RootState) =>
  state.comments.fetchLoading;

export const selectCommentCreating = (state: RootState) =>
  state.comments.isCreating;

export const selectCreateError = (state: RootState) =>
  state.comments.createError;
