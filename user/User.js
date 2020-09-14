import pkg from 'mongoose';
const { Schema, model } = pkg;

const UserSchema = new Schema({
  departmentName: { type: String, required: true },
  username: { type: String, required: true },
  role: {
    type: String,
    required: true,
    enum: ['user', 'superuser', 'admin'],
  },
  email: { type: String, unique: true, required: true },
  hashedPassword: { type: String, select: false },
  phoneNumber: String,
  address: {
    country: { type: String, required: true },
    city: { type: String, required: true },
    street: { type: String, required: true },
    house: { type: String, required: true },
    postalCode: { type: String, required: true },
  },
  createdAt: { type: String, default: new Date().toISOString() },
});

const User = model('User', UserSchema);

export default User;
