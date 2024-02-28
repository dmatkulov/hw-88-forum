import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import config from './config';
import userRouter from './routers/users';
import postsRouter from './routers/posts';
import commentsRouter from './routers/comments';

const app = express();
const port = 8000;

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.use('/users', userRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);

const run = async () => {
  await mongoose.connect(config.mongoose.db);

  app.listen(port, () => {
    console.log('Server started on port!' + port);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

void run();
