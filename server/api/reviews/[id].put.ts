import { Review } from "~~/server/models/review";
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

    // Validate body
    const bodyParse = await readValidatedBody(event, InsertReviewSchema.safeParse);
    
    if (!bodyParse.success) {
        const statusMessage = bodyParse.error.issues
            .map((issue) => `${issue.path.join('')}: ${issue.message}`)
            .join("; ");

        const statusData = bodyParse.error.issues
            .reduce((errors, issue) => {
                errors[issue.path.join('')] = issue.message;
                return errors;
            }, {} as Record<string, string>);

        return sendError(event, createError({
            status: 422,
            statusMessage,
            data: statusData,
        }));
    }

    // Build updated review
    const workId = bodyParse.data.book;
    const bookTitleInfo = await getBookTitleByWorkId(bodyParse.data.book);

    if ('error' in bookTitleInfo) {
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: 'Invalid book ID',
        }));
    }

    const reviewData: ReviewSchemaType = {
        ...bodyParse.data,
        author: event.context.user._id,
        book: {
            title: bookTitleInfo.title,
            workId,
        },
    };

    return await 
        Review
        .updateOne({ _id: id }, reviewData)
        .exec();
});