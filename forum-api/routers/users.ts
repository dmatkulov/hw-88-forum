import express from 'express';
import mongoose from 'mongoose';
import User from '../models/User';

const userRouter = express.Router();

userRouter.post('/', async (req, res, next) => {
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
    });

    user.generateToken();
    await user.save();

    return res.send({
      message: `${user.username} registered successfully!`,
      user,
    });
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }
    next(e);
  }
});

userRouter.post('/sessions', async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return res.status(422).send({ error: 'Invalid credentials!' });
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
      return res.status(422).send({
        error: 'Invalid credentials: username or password is incorrect!',
      });
    }

    user.generateToken();
    await user.save();

    return res.send({ message: `Welcome back, ${user.username}`, user });
  } catch (e) {
    next(e);
  }
});
export default userRouter;
