import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { routes } from '../../constants';
import { Post } from '../../types';

export const fetchPosts = createAsyncThunk<Post[]>(
  'posts/fetchAll',
  async () => {
    const response = await axiosApi.get<Post[]>(routes.posts);

    return response.data ?? [];
  },
);
