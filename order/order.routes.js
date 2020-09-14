import Router from 'express';
import authorize from '../utils/authorize.js';
import {
  getUsersOrders,
  createNewOrder,
  setStatus,
  deleteOrder,
} from './order.controller.js';

const router = Router();

router.get('/orders', authorize(), getUsersOrders);

router.post('/', authorize(), createNewOrder);

router.patch('/', authorize(['admin', 'superUser']), setStatus);

router.delete('/', authorize(['admin', 'superUser']), deleteOrder);

export default router;
