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

router.get('/all', authorize(['admin', 'superUser']), getAllOrders);

router.post('/', authorize(), createNewOrder);

router.patch('/', authorize(['admin', 'superUser']), setStatus);

router.delete('/', authorize(['admin', 'superUser']), deleteOrder);

export default router;
