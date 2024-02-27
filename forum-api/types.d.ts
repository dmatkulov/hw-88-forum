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
  userId: Types.ObjectId;
  title: string;
  description: string | null;
  image: string | null;
  datetime: string;
}
