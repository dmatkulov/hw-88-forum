import { Router } from 'express';
import auth, { RequestWithUser } from '../middleware/auth';
import { PostFields } from '../types';
import { imagesUpload } from '../multer';
import Post from '../models/Post';
import mongoose, { Types } from 'mongoose';

const postsRouter = Router();

postsRouter.get('/', async (_req, res, next) => {
  try {
    const posts = await Post.find({}, { description: false })
      .sort({ datetime: -1 })
      .populate('user', 'username');

    return res.send(posts);
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

    const post = await Post.findById(_id).populate('user', '_id username');

    if (!post) {
      return res.status(404).send({ error: 'Post does not exist!' });
    }

    res.send(post);
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
      const title = req.body.title;
      const description = req.body.description ? req.body.description : null;
      const image = req.file ? req.file.filename : null;

      if (!userId) {
        return res.status(422).send({ error: 'User ID is undefined!' });
      }

      const postData: PostFields = {
        user: userId,
        title,
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
