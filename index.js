import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
//import connectDB from './database/mongoose';
import loginRoute from './user/user.login.js';

const port = process.env.PORT || 5000;

const app = express();
dotenv.config();
//connectDB();

// middlewares

app.use(cors());
app.use(express.json({ limit: '10kb' }));

// routes

app.use('/api/login', loginRoute);

app.listen(port, () => console.log('Server runnnig on port: ' + port));
