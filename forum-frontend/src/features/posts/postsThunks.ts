import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { routes } from '../../constants';
import { Post, PostApi } from '../../types';

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
