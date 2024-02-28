import { Model, Types } from 'mongoose';

export interface UserFields {
  username: string;
  password: string;
  token: string;
}

interface UserMethods {
  checkPassword(password: string): Promise<boolean>;

  generateToken(): void;
}

type UserModel = Model<UserFields, unknown, UserMethods>;

export interface PostFields {
  user: mongoose.Types.ObjectId;
  title: string;
  description: string | null;
  image: string | null;
  datetime: string;
}

export interface CommentFields {
  user: mongoose.Types.ObjectId;
  post: Types.ObjectId;
  text: string;
}
