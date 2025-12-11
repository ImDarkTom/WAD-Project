import { Review } from "~~/server/models/review";
import { User } from "~~/server/models/user";
import defineAuthenticatedEventHander from "~~/server/util/defineAuthenticatedEventHandler";
import { getBookTitleByWorkId } from "~~/server/util/openlibrary";
import { InsertReviewSchema, PopulatedReviewSchemaType, ReviewSchemaType } from "~~/shared/schemas";

// https://nuxt.com/docs/4.x/directory-structure/server#error-handling

export default defineAuthenticatedEventHander(async (event) => {
    // Validate ID
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

    const author = await User
        .findOne({ username: result.author.username })
        .lean()
        .exec();

    if (!author) {
        return sendError(event, createError({
            statusCode: 500,
            statusMessage: 'Failed to get author for review.'
        }));
    }

    // authenticate
    if (author.token !== event.context.token) {
        return sendError(event, createError({
            statusCode: 401,
            statusMessage: 'Unauthorized'
        }));
    }

    // delete
    return await Review
        .deleteOne({ _id: id })
        .exec();
});