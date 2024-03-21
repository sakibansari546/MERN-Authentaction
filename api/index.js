import express from 'express'
const app = express();
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import userRoute from './reoutes/user.route.js'

console.log(process.env.MONGo_URI);
const uri = "mongodb+srv://mern:mern@mern.41cokr0.mongodb.net/mern-auth?retryWrites=true&w=majority&appName=mern"
mongoose.connect(uri).then(() => {
    console.log("connect to db");
})

app.use('/api/user', userRoute)


app.listen(8080, () => {
    console.log('server is running');
})