import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { routes } from '../../constants';
import { Post, PostApi, PostMutation, ValidationError } from '../../types';
import { isAxiosError } from 'axios';
import { RootState } from '../../app/store';

export const fetchPosts = createAsyncThunk<Post[]>(
  'posts/fetchAll',
  async () => {
    const response = await axiosApi.get<Post[]>(routes.posts);

    return response.data ?? [];
  },
);

export const fetchSinglePost = createAsyncThunk<PostApi | null, string>(
  'posts/fetchOne',
  async (postId) => {
    const response = await axiosApi.get<PostApi | null>(
      routes.posts + '/' + postId,
    );
    return response.data ?? null;
  },
);

export const createPost = createAsyncThunk<
  void,
  PostMutation,
  { state: RootState; rejectValue: ValidationError }
>('posts/createPost', async (post, { getState, rejectWithValue }) => {
  try {
    const token = getState().users.user?.token;

    const formData = new FormData();

    formData.append('title', post.title);

    if (post.description) {
      formData.append('description', post.description);
    }

    if (post.image) {
      formData.append('image', post.image);
    }

    await axiosApi.post(routes.posts, formData, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 422) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});
