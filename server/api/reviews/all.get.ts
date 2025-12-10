import { Review } from "~~/server/models/review";
import { PopulatedReviewSchemaType } from "~~/shared/schemas";

export default defineEventHandler(async (event) => {
    const results = await Review
        .find()
        .populate('author', 'username') // load the username from the linked author
        .lean()
        .exec();

    // Trim to first 70 chars
    const formattedResults = results.map(result => ({
            ...result,
            content: result.content.substring(0, 70)
    }));

    return formattedResults as unknown as MongooseSchema<PopulatedReviewSchemaType>[];
});