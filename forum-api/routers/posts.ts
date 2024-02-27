import { Router } from 'express';
import auth, { RequestWithUser } from '../middleware/auth';
import { PostFields } from '../types';
import { imagesUpload } from '../multer';
import Post from '../models/Post';
import mongoose, { Types } from 'mongoose';
import Comment from '../models/Comment';

const postsRouter = Router();

postsRouter.get('/', async (req, res, next) => {
  try {
    const posts = await Post.find()
      .sort({ datetime: -1 })
      .populate('user', 'username');

    const result = posts.map((post) => ({
      _id: post._id,
      user: post.user,
      title: post.title,
      image: post.image ? post.image : null,
      datetime: post.datetime,
    }));

    return res.send(result);
  } catch (e) {
    next(e);
  }
});

postsRouter.get('/:id', async (req, res, next) => {
  try {
    let _id: Types.ObjectId;
    try {
      _id = new Types.ObjectId(req.params.id);
    } catch {
      return res.status(404).send({ error: 'Wrong ObjectId!' });
    }

    const post = await Post.findById(_id).populate('user', 'username');

    if (!post) {
      return res.status(404).send({ error: 'Post does not exist!' });
    }

    const comments = await Comment.find({ post: post._id }).populate(
      'user',
      'username',
    );

    const result = {
      post,
      comments,
    };

    res.send(result);
  } catch (e) {
    next(e);
  }
});
postsRouter.post(
  '/',
  auth,
  imagesUpload.single('image'),
  async (req: RequestWithUser, res, next) => {
    try {
      const userId = req.user?._id;
      const description = req.body.description ? req.body.description : null;
      const image = req.file ? req.file.filename : null;

      if (!description && !image) {
        return res
          .status(422)
          .send({ error: 'Description or image must be present' });
      }

      if (!userId) {
        return res.status(422).send({ error: 'User ID is undefined!' });
      }

      const postData: PostFields = {
        user: userId,
        title: req.body.title,
        description,
        image,
        datetime: new Date().toISOString(),
      };

      const post = new Post(postData);
      await post.save();

      res.send(post);
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(422).send(e);
      }

      next(e);
    }
  },
);

export default postsRouter;