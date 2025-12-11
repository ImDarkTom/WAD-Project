import { Review } from "~~/server/models/review";
import { PopulatedReviewSchemaType } from "~~/shared/schemas";

export default defineEventHandler(async (event) => {
    const query = event.context.params?.query;

    if (!query) {
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: 'Query must not be blank.'
        }));
    }

    // https://stackoverflow.com/a/26814550
    const results = await Review
        .find({ title: { "$regex": query, "$options": "i" } })
        .populate('author', 'username') // load the username from the linked author
        .lean()
        .exec();

    if (!results) {
        return sendError(event, createError({
            statusCode: 404,
            statusMessage: 'Review not found.'
        }));
    }

    // Trim to first 70 chars
    const formattedResults = results.map(result => ({
            ...result,
            content: result.content.substring(0, 70)
    }));

    return formattedResults.reverse() as unknown as MongooseSchema<PopulatedReviewSchemaType>;
});