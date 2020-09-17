import pkg from "mongoose";
const { Schema, model } = pkg;

const OrderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true },
  items: [
    {
      itemId: { type: String, required: true },
      name: { type: String, required: true },
      count: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  value: Number,
  isSend: { type: Boolean, default: false },
  adnotation: String,
  createdAt: { type: String, default: new Date().toISOString() },
});

const Order = model("Order", OrderSchema);

export default Order;
