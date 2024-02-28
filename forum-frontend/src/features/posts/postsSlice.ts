import { Post } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchPosts } from './postsThunks';
import { RootState } from '../../app/store';

interface PostsState {
  items: Post[];
  fetchLoading: boolean;
}

const initialState: PostsState = {
  items: [],
  fetchLoading: false,
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
  },
});

export const postsReducer = postsSlice.reducer;

export const selectPosts = (state: RootState) => state.posts.items;
export const selectPostsLoading = (state: RootState) =>
  state.posts.fetchLoading;
