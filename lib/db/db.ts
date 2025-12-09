import mongoose from 'mongoose';

export async function connectDb() {
    await mongoose.connect('mongodb://localhost:27017/WADReviews')
}