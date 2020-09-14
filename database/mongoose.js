import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const DB = process.env.DB_CLUSTER_ADRESS;

const connectDB = () => {
  mongoose
    .connect(DB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('DB connection succesfull!');
    })
    .catch((err) => console.log(err));
};

export default connectDB;
