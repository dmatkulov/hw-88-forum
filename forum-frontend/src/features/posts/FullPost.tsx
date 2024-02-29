import React, { useCallback, useEffect } from 'react';
import PostArticle from './components/PostArticle';
import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectOnePostLoading, selectPost } from './postsSlice';
import { fetchSinglePost } from './postsThunks';
import LoadingPage from '../../components/IU/LoadingPage/LoadingPage';
import Comments from '../comments/components/Comments';
import { fetchComments, submitComment } from '../comments/commentsThunks';
import { selectUser } from '../users/usersSlice';
import InfoAlert from '../../components/IU/Alerts/InfoAlert';
import CommentForm from '../comments/components/CommentForm';
import { CommentBody, CommentMutation } from '../../types';
import { selectComments } from '../comments/commentsSlice';

const FullPost: React.FC = () => {
  const { id } = useParams() as { id: string };

  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const post = useAppSelector(selectPost);
  const loading = useAppSelector(selectOnePostLoading);
  const comments = useAppSelector(selectComments);

  const fetchPost = useCallback(async () => {
    await dispatch(fetchSinglePost(id));
    await dispatch(fetchComments(id));
  }, []);

  useEffect(() => {
    void fetchPost();
  }, [fetchPost]);

  const onSubmitComment = async (comment: CommentBody) => {
    const newComment: CommentMutation = {
      post: id,
      text: comment.text,
    };
    await dispatch(submitComment(newComment));
    await dispatch(fetchComments(id));
  };

  return (
    <>
      <Box mb={6}>
        {loading && <LoadingPage />}
        {post && <PostArticle post={post} />}
      </Box>

      <Box mb={4}>
        {user ? (
          <CommentForm
            username={user.username.charAt(0)}
            onSubmit={onSubmitComment}
          />
        ) : (
          <InfoAlert message={'Login to leave a comment'} />
        )}
      </Box>

      <Typography variant="subtitle1" gutterBottom mb={3}>
        {comments.length > 0 ? 'Comments' : 'No comments yet'}
      </Typography>
      <Comments />
    </>
  );
};

export default FullPost;
