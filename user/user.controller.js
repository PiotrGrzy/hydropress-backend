import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pkg from 'express-validator';
import User from './User.js';
import { userService } from './user.service.js';
const { check, validationResult } = pkg;

export const authenticate = async (req, res, next) => {
  const { email, password } = req.body;
  check(email, 'Invalid email adress').isEmail();
  check(password, 'No password provided').exists();
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findOne({ email }, '+hashedPassword');
    if (!user) {
      return res.status(400).json({ msg: 'Invalid username or password' });
    }
    const passwordCorrect = await bcrypt.compare(password, user.hashedPassword);

    if (!passwordCorrect) {
      return res.status(400).json({ msg: 'Invalid username or password' });
    }

    const { hashedPassword, ...rest } = user;
    const payload = {
      user: {
        ...rest,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 36000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    next(err);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    next(err);
  }
};

export const getSingleUser = async (req, res, next) => {
  const currentUser = req.user;
  const id = req.params.id;

  // only allow admins to access other user records
  if (
    (id !== currentUser._id && currentUser.role !== 'admin') ||
    currentUser.role !== 'superUser'
  ) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const user = await User.find({ _id: id });
    res.send(user);
  } catch (err) {
    next(err);
  }
};

export const registerUser = async (req, res, next) => {
  try {
    req.body.hashedPassword = await bcrypt.hash(req.body.hashedPassword, 10);
    const newUser = await User.create({ ...req.body });
    const { hashedPassword, ...rest } = newUser;
    res.send(rest);
  } catch (err) {
    next(err);
  }
};
