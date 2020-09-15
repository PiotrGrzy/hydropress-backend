import Router from 'express';
import authorize from '../utils/authorize.js';
import {
  authenticate,
  getAllUsers,
  getSingleUser,
  registerUser,
  updateUserLimit,
} from './user.controller.js';

const router = Router();

// login users unprotected route

router.post('/login', authenticate);

// list all users, only for admin and superuser

router.get('/users', authorize(['superUser', 'admin']), getAllUsers);

// get single user data only for logged in users

router.get('/users/:id', authorize(), getSingleUser);

// update limit

router.patch('/limit/:id', authorize(), updateUserLimit);

// register user only for admin

router.post('/register', authorize(['superUser', 'admin']), registerUser);

export default router;
