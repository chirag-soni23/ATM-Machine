import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        id: String,
        url: String
    },
    balance:{
        type:Number,
        default:0
    }
}, { timestamps: true });

export const User = mongoose.model('user', userSchema);
