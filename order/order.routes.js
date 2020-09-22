import Router from 'express';
import authorize from '../utils/authorize.js';
import {
  getUsersOrders,
  createNewOrder,
  setStatus,
  deleteOrder,
  getAllOrders,
} from './order.controller.js';

const router = Router();

router.get('/user/:id', authorize(), getUsersOrders);

router.get('/all', authorize(['admin', 'superuser']), getAllOrders);

router.post('/', authorize(), createNewOrder);

router.patch('/', authorize(['admin']), setStatus);

router.delete('/', authorize(['admin']), deleteOrder);

export default router;
