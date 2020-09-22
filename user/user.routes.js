import Router from 'express';
import authorize from '../utils/authorize.js';
import {
  authenticate,
  getAllUsers,
  getSingleUser,
  registerUser,
  updateUserLimit,
  setUserLimit,
} from './user.controller.js';

const router = Router();

// login users unprotected route

router.post('/login', authenticate);

// list all users, only for admin and superuser

router.get('/users', authorize(['superuser', 'admin']), getAllUsers);

// get single user data only for logged in users

router.get('/users/:id', authorize(), getSingleUser);

// update limit

router.patch('/limit/:id', authorize(), updateUserLimit);

// set limit

router.patch('/setlimit/:id', authorize(['superuser', 'admin']), setUserLimit);

// register user only for admin

router.post('/register', authorize(['admin']), registerUser);

export default router;
