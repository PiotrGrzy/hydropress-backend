import Order from './Order.js';
import {
  sendConfirmationEmails,
  sendStatusUpdateEmail,
} from '../email/email.services.js';

export const getUsersOrders = async (req, res, next) => {
  if (req.params.id !== req.user._id) {
    res.status(401).send('Unauthorized');
  }
  try {
    const orders = await Order.find({ userId: req.params.id });
    res.send(orders);
  } catch (err) {
    next(err);
  }
};

export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({});
    res.send(orders);
  } catch (err) {
    next(err);
  }
};

export const createNewOrder = async (req, res, next) => {
  if (req.body.userId !== req.user._id) {
    res.status(401).send('Unauthorized');
  }
  const { hashedPassword, ...rest } = req.user;
  const userData = rest;

  try {
    const newOrder = await Order.create({ ...req.body });
    sendConfirmationEmails(newOrder, userData, req.body.diffAddress);
    res.send(newOrder);
  } catch (err) {
    next(err);
  }
};

export const setStatus = async (req, res, next) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.body.id, {
      isSend: true,
      mailNum: req.body.mailNum,
    });
    sendStatusUpdateEmail(updatedOrder, req.body.mailNum);
    res.status(200).json(updatedOrder);
  } catch (err) {
    next(err);
  }
};

export const deleteOrder = async (req, res, next) => {
  try {
    await Order.findByIdAndRemove(req.body.id);
    res.status(200).send('Order deleted');
  } catch (err) {
    next(err);
  }
};
