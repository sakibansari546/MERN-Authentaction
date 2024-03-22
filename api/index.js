import express from 'express'
const app = express();
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import userRoute from './reoutes/user.route.js'
import authRoute from './reoutes/auth.route.js'

// console.log(process.env.MONGo_URI);
// console.log(process.env.JWT_SECRET);
const uri = process.env.MONGo_URI;
mongoose.connect(uri).then(() => {
    console.log("connect to db");
})

app.use(express.json());

app.use('/api/user', userRoute)
app.use('/api/auth', authRoute)


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server Error!"
    res.status(statusCode).json({
        success: false,
        message,
        statusCode
    })
})

app.listen(8080, () => {
    console.log('server is running');
})