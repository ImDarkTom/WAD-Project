import { nanoid } from 'nanoid';
import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
    username: {
        type: 'string',
        required: true,
        unique: true,
    },
    password: {
        type: 'string',
        required: true,
        min: 8
    },
    token: {
        type: 'string',
        default: nanoid()
    }
});

export const User = mongoose.model('User', userSchema);