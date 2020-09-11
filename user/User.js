import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  departmentName: String,
  username: String,
  email: { type: String, unique: true },
  hashedPassword: { type: String, select: false },
  phoneNumber: String,
  address: {
    country: String,
    city: String,
    street: String,
    house: String,
    postalCode: String,
  },
  createdAt: { type: String, default: new Date().toISOString() },
});

export const UserModel = model('User', UserSchema);
