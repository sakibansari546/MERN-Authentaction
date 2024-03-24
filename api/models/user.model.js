import { Timestamp } from "bson";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        reqired: true,
        unique: true
    },
    email: {
        type: String,
        reqired: true,
        unique: true
    },
    password: {
        type: String,
        reqired: true,
    },
    profilePic: {
        type: String,
        default: "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
    }
}, { Timestamp: true });

const User = mongoose.model("User", userSchema);
export default User;