import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import path from 'path';

import authRoute from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import matchRoutes from './routes/matchRoutes.js';

const app = express();
dotenv.config();

// MongoDB connection function
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB);
        console.log('Connected to MongoDB');
    } catch (error) {
        throw error
    }
};

// If MongoDB connection is lost, try to connected again.
mongoose.connection.on('disconnected', () => {
    console.log("mongoDB disconnected")
})
mongoose.connection.on('connected', () => {
    console.log("mongoDB connected")
})

// Endpoint configuration
app.get("/", (req, res) => {
    console.log('you hit the endpoint');
    res.send('you hit the endpoint');
})

// Middlewares
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(cookieParser());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoute);
app.use('/api/match', matchRoutes);

app.listen(5000, () => {
    connect();
    console.log("Server is running at port 5000");
});



