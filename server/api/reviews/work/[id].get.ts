import { Review } from "~~/server/models/review";
import { PopulatedReviewSchemaType } from "~~/shared/schemas";

export default defineEventHandler(async (event) => {
    const id = event.context.params?.id;

    if (!id) {
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: 'Work ID must not be blank.'
        }));
    }

    const results = await Review
        .find({ 'book.workId': id })
        .populate('author', 'username') // load the username from the linked author
        .lean()
        .exec();

    if (!results) {
        return sendError(event, createError({
            statusCode: 404,
            statusMessage: 'No reviews found.'
        }));
    }

    // Trim to first 70 chars
    const formattedResults = results.map(result => ({
            ...result,
            content: result.content.substring(0, 70)
    }));

    return formattedResults as unknown as MongooseSchema<PopulatedReviewSchemaType>;
});