import { Review } from "~~/server/models/review";

export default defineEventHandler(async (event) => {
    const results = await Review.find();

    return results;
});