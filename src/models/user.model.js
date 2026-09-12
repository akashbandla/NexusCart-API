import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    role: {
        type: String,
        required: true,
        trim: true,
        enum : ['admin', 'user'],
        default: 'user'
    },
    password:{
        type: String,
        required: true,
        trim: true,
        select: false
    }
},{timestamps: true});

const User = mongoose.model('Users', userSchema);

export default User;