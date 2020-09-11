import { Schema, model } from 'mongoose';

const OrderSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  items: [
    {
      itemId: String,
      count: Number,
      value: Number,
    },
  ],
  isSend: Boolean,
  createdAt: { type: String, default: new Date().toISOString() },
});

export const OrderModel = model('Order', OrderSchema);
