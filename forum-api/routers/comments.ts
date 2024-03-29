import { Router } from 'express';

import auth, { RequestWithUser } from '../middleware/auth';
import Post from '../models/Post';
import Comment from '../models/Comment';

import { CommentFields, CommentResponse } from '../types';
import { Types } from 'mongoose';

const commentsRouter = Router();

commentsRouter.get('/', async (req, res, next) => {
  try {
    const postId = req.query.post as string;

    try {
      new Types.ObjectId(postId);
    } catch {
      return res.status(404).send({ error: 'Wrong ObjectId!' });
    }

    const comments = await Comment.find<CommentResponse[]>({
      post: postId,
    })
      .populate('user', '_id username')
      .sort({ _id: -1 });

    res.send({ comments: comments, count: comments.length });
  } catch (e) {
    next(e);
  }
});
commentsRouter.post('/', auth, async (req: RequestWithUser, res, next) => {
  try {
    const userId = req.user?._id;
    const postId = req.body.post;
    const text = req.body.text;

    if (!userId) {
      return res.status(422).send({ error: 'User ID is undefined!' });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(422).send({ error: 'Post not found' });
    }

    if (!text) {
      return res.status(422).send({ error: 'Comment text must be present' });
    }

    const commentData: CommentFields = {
      user: userId,
      post: postId,
      text,
    };

    const comment = new Comment(commentData);
    await comment.save();

    return res.send(comment);
  } catch (e) {
    next(e);
  }
});

export default commentsRouter;
