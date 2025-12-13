import { connectDb } from '~~/lib/db/db';
import mongoose from 'mongoose';
import { User } from '../models/user';
import { Review } from '../models/review';

export default defineNitroPlugin(async (nitroApp) => {
    try {
        await connectDb()
        console.log("Connected to MongoDB.");

        // Issue related to tree-shaking removing the models.
        // https://github.com/nuxt/nuxt/issues/26531#issuecomment-2025118655
        const _ = [
            User.length,
            Review.length
        ];
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