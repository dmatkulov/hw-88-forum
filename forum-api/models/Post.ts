import mongoose, { Types } from 'mongoose';
import { PostFields } from '../types';
import User from './User';

const Schema = mongoose.Schema;

const PostSchema = new mongoose.Schema<PostFields>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (userId: Types.ObjectId) => {
        const user = await User.findById(userId);
        return Boolean(user);
      },
      message: 'User does not exists',
    },
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: String,
  datetime: Date,
});

const Post = mongoose.model('Post', PostSchema);
export default Post;
