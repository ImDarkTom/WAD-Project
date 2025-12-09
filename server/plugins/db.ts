import { connectDb } from '~~/lib/db/db';
import mongoose from 'mongoose';

export default defineNitroPlugin(async (nitroApp) => {
    try {
        await connectDb()
        console.log("Connected to MongoDB.");
    } catch (e) {
        console.error(`Error connecting to MongoDB: ` + e);
    }

    if (nitroApp.hooks) {
        nitroApp.hooks.hook('close', async () => {
            console.log('Closing MongoDB connection.');
            await mongoose.disconnect();
        });
    }
});