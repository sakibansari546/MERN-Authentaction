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
        if (!validUser) return next(errorHandler(404, "Invalid email or password!"));
        const validPassword = bcrypt.compareSync(password, validUser.password);
        if (!validPassword) return next(errorHandler(401, "Invalid email or password!"));

        // Set token expiration time to 7 days (in seconds)
        const expiresIn = Date(Date.now() + 60 * 60 * 24 * 7);

        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, { expiresIn });
        const { password: hashPassword, ...rest } = validUser._doc;
        res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);
    } catch (error) {
        next(error)
    }
}
