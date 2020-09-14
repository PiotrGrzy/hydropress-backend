import Order from "./Order.js";

export const getUsersOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ userId: req.body.userId });
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
    res.status(401).send("Unauthorized");
  }
  try {
    const newOrder = await Order.create({ ...req.body });
    res.send(newOrder);
  } catch (err) {
    next(err);
  }
};

export const setStatus = async (req, res, next) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
      isSend: req.body.isSend,
    });
    res.status(200).json(updatedOrder);
  } catch (err) {
    next(err);
  }
};

export const deleteOrder = async (req, res, next) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).send("Order deleted");
  } catch (err) {
    next(err);
  }
};
