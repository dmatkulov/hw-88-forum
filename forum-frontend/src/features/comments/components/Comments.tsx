import React from 'react';
import CommentItem from './CommentItem';
import { useAppSelector } from '../../../app/hooks';
import { selectComments } from '../commentsSlice';

const Comments: React.FC = () => {
  const comments = useAppSelector(selectComments);
  return (
    <>
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

export default Comments;
