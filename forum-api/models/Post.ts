import mongoose, { HydratedDocument, Types } from 'mongoose';
import { PostFields } from '../types';
import User from './User';

const Schema = mongoose.Schema;

const PostSchema = new mongoose.Schema<PostFields>({
  user: {
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
    required: [true, 'Title must be present'],
  },
  description: {
    type: String,
    validate: {
      validator: function (this: HydratedDocument<PostFields>) {
        return this.description || this.image;
      },
      message: 'Description or image must be present',
    },
  },
  image: {
    type: String,
    validate: {
      validator: function (this: HydratedDocument<PostFields>) {
        return this.description || this.image;
      },
      message: 'Image or description must be present',
    },
  },
  datetime: Date,
});

const Post = mongoose.model('Post', PostSchema);
export default Post;
