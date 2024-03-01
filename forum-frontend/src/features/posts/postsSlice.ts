import { Post, PostApi, ValidationError } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { createPost, fetchPosts, fetchSinglePost } from './postsThunks';
import { RootState } from '../../app/store';

interface PostsState {
  items: Post[];
  item: PostApi | null;
  fetchLoading: boolean;
  fetchOneLoading: boolean;
  createLoading: boolean;
  createError: ValidationError | null;
}

const initialState: PostsState = {
  items: [],
  item: null,
  fetchLoading: false,
  fetchOneLoading: false,
  createLoading: false,
  createError: null,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, { payload: posts }) => {
        state.fetchLoading = false;
        state.items = posts;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.fetchLoading = false;
      });

    builder
      .addCase(fetchSinglePost.pending, (state) => {
        state.fetchOneLoading = true;
      })
      .addCase(fetchSinglePost.fulfilled, (state, { payload: post }) => {
        state.fetchOneLoading = false;
        state.item = post;
      })
      .addCase(fetchSinglePost.rejected, (state) => {
        state.fetchOneLoading = true;
      });

    builder
      .addCase(createPost.pending, (state) => {
        state.createLoading = true;
        state.createError = null;
      })
      .addCase(createPost.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(createPost.rejected, (state, { payload: error }) => {
        state.createLoading = false;
        state.createError = error || null;
      });
  },
});

export const postsReducer = postsSlice.reducer;

export const selectPosts = (state: RootState) => state.posts.items;
export const selectPost = (state: RootState) => state.posts.item;
export const selectPostsLoading = (state: RootState) =>
  state.posts.fetchLoading;
export const selectOnePostLoading = (state: RootState) =>
  state.posts.fetchOneLoading;

export const selectCreatePostLoading = (state: RootState) =>
  state.posts.createLoading;
export const selectCreatePostError = (state: RootState) =>
  state.posts.createError;
