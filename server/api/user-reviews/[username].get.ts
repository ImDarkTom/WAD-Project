import { Review } from "~~/server/models/review";
import { findUserByUsername } from "~~/server/util/user";
import { PopulatedReviewSchemaType } from "~~/shared/schemas";

// https://nuxt.com/docs/4.x/directory-structure/server#error-handling

export default defineEventHandler(async (event) => {
    const username = event.context.params?.username;

    if (!username) {
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: 'Username must not be blank.'
        }));
    }

    const { data: userInfo, error } = await findUserByUsername(username);

    if (error || !userInfo) {
        return sendError(event, createError({
            statusCode: 404,
            statusMessage: 'User not found.'
        }));
    }

    const results = await Review
        .find({ author: userInfo._id })
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

    return results as unknown as MongooseSchema<PopulatedReviewSchemaType>;
});