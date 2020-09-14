import pkg from "mongoose";
const { Schema, model } = pkg;

const UserSchema = new Schema({
  departmentName: String,
  username: String,
  role: String,
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

const User = model("User", UserSchema);

export default User;
