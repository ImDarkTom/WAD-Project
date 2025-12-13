import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI ?? "";

export async function connectDb() {
    if (MONGODB_URI.length === 0) {
        throw new Error("No MongoDB URI set in .env file.");
    }

    await mongoose.connect(MONGODB_URI)
}