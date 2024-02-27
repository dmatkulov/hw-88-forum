import { Router } from 'express';
import auth, { RequestWithUser } from '../middleware/auth';
import { PostFields } from '../types';
import { imagesUpload } from '../multer';
import Post from '../models/Post';
import mongoose from 'mongoose';

const postsRouter = Router();

postsRouter.get('/', async (req, res, next) => {
  try {
    const posts = await Post.find();
    return res.send(posts);
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
        return res.status(422).send({ error: 'User ID id missing!' });
      }

      const postData: PostFields = {
        userId,
        title: req.body.title,
        description,
        image,
        datetime: new Date().toISOString(),
      };

      const newPost = new Post(postData);
      await newPost.save();

      res.send(newPost);
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(422).send(e);
      }

      next(e);
    }
  },
);

export default postsRouter;
