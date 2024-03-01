import React, { useCallback, useEffect } from 'react';
import PostArticle from './components/PostArticle';
import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectOnePostLoading, selectPost } from './postsSlice';
import { fetchSinglePost } from './postsThunks';
import LoadingPage from '../../components/IU/LoadingPage/LoadingPage';
import { fetchComments, submitComment } from '../comments/commentsThunks';
import { selectUser } from '../users/usersSlice';
import CommentForm from '../comments/components/CommentForm';
import { CommentBody, CommentMutation } from '../../types';
import { selectComments } from '../comments/commentsSlice';
import CommentItem from '../comments/components/CommentItem';
import InfoAlert from '../../components/IU/Alerts/InfoAlert';

const FullPost: React.FC = () => {
  const { id } = useParams() as { id: string };

  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const post = useAppSelector(selectPost);
  const loading = useAppSelector(selectOnePostLoading);
  const comments = useAppSelector(selectComments);

  const fetchPost = useCallback(async () => {
    await dispatch(fetchSinglePost(id)).unwrap();
    await dispatch(fetchComments(id)).unwrap();
  }, []);

  useEffect(() => {
    void fetchPost();
  }, [fetchPost]);

  const onSubmitComment = async (comment: CommentBody) => {
    const newComment: CommentMutation = {
      post: id,
      text: comment.text,
    };
    await dispatch(submitComment(newComment)).unwrap();
    await dispatch(fetchComments(id)).unwrap();
  };

  return (
    <>
      <Box mb={6}>
        {loading && <LoadingPage />}
        {post && <PostArticle post={post} />}
      </Box>

      <Box mb={4}>
        {user && (
          <CommentForm
            username={user.username.charAt(0)}
            onSubmit={onSubmitComment}
          />
        )}

        {!user && <InfoAlert message={'Login to leave a comment'} />}
      </Box>

      <Typography variant="subtitle1" gutterBottom mb={3}>
        {comments.length > 0 ? 'Comments' : 'No comments yet'}
      </Typography>

      {comments.map((comment) => (
        <CommentItem
          key={comment._id}
          user={comment.user.username}
          text={comment.text}
        />
      ))}
    </>
  );
};

export default FullPost;
