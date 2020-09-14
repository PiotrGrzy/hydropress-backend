import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './database/mongoose.js';
import userRouter from './user/user.router.js';
import orderRouter from './order/order.routes.js';
import errorHandler from './utils/errorHandler.js';

const port = process.env.PORT || 5000;

const app = express();
dotenv.config();

connectDB();

// middlewares

app.use(cors());
app.use(express.json({ limit: '10kb' }));
app.use(errorHandler);

// routes

app.use('/api/user', userRouter);
app.use('/api/order', orderRouter);

app.listen(port, () => console.log('Server runnnig on port: ' + port));
