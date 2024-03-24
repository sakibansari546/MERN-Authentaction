import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken'

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    try {
        await newUser.save();
        res.status(201).json({ message: "User creates successfully!" })
    } catch (error) {
        next(error);
    }
}


export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return next(errorHandler(404, "Invalid email or password!"));
        }
        const validPassword = bcrypt.compareSync(password, validUser.password);
        if (!validPassword) {
            return next(errorHandler(401, "Invalid email or password!"));
        }

        // Set token expiration time to 7 days (in milliseconds)
        const expiresIn = 1000 * 60 * 60 * 24 * 7; // 7 days in milliseconds

        // Calculate expiration date
        const expirationDate = new Date(Date.now() + expiresIn);

        // Generate JWT token
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

        // Remove password from user object before sending in response
        const { password: hashPassword, ...rest } = validUser._doc;

        // Set cookie with token and expiration date
        res.cookie('access_token', token, { httpOnly: true, expires: expirationDate });

        // Send user data in response
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
}



export const google = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            // User already exists, generate token and send user data
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            const { password, ...rest } = user._doc;
            const expiresIn = 1000 * 60 * 60 * 24 * 7; // 7 days in milliseconds
            const expirationDate = new Date(Date.now() + expiresIn);

            res.cookie('access_token', token, { httpOnly: true, expires: expirationDate });
            res.status(200).json(rest);
        } else {
            // User doesn't exist, create a new user
            const generatedPassword = Math.random().toString(36).slice(-8);
            const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
            const randomSuffix = Math.floor(Math.random() * 10000); // Generate a random number between 0 and 9999
            const newUsername = req.body.username.replace(/\s+/g, "").toLowerCase() + randomSuffix;
            const newUser = new User({ ...req.body, username: newUsername, password: hashedPassword });

            await newUser.save();

            // Generate token for the new user and send user data
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            const { password, ...rest } = newUser._doc;
            const expiresIn = 1000 * 60 * 60 * 24 * 7; // 7 days in milliseconds
            const expirationDate = new Date(Date.now() + expiresIn);

            res.cookie('access_token', token, { httpOnly: true, expires: expirationDate });
            res.status(200).json(rest);
        }
    } catch (error) {
        next(error);
    }
}
