import mongoose from 'mongoose';

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
    .catch(() => console.log('Connection to DB failed'));
};

export default connectDB;
