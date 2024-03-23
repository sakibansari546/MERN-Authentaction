import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from './reoutes/user.route.js';
import authRoute from './reoutes/auth.route.js';
import { errorHandler } from './utils/error.js'; // Import the errorHandler function

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

const uri = process.env.MONGo_URI;
mongoose.connect(uri).then(() => {
    console.log("Connected to database");
}).catch(err => {
    console.error("Database connection error:", err);
});

app.use(express.json());

app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);

// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";
    res.status(statusCode).json({
        success: false,
        message: message,
        statusCode: statusCode
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
