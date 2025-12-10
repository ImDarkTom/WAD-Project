import { Review } from "~~/server/models/review";
import { PopulatedReviewSchemaType } from "~~/shared/schemas";

// https://nuxt.com/docs/4.x/directory-structure/server#error-handling

export default defineEventHandler(async (event) => {
    const id = event.context.params?.id;

    if (!id) {
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: 'ID must not be blank.'
        }));
    }

    const result = await Review
        .findOne({ _id: id })
        .populate('author', 'username') // load the username from the linked author
        .lean()
        .exec();

    if (!result) {
        return sendError(event, createError({
            statusCode: 404,
            statusMessage: 'Review not found.'
        }));
    }

    return result as unknown as MongooseSchema<PopulatedReviewSchemaType>;
});