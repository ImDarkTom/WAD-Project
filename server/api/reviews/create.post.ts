import { Review } from '~~/server/models/review';
import defineAuthenticatedEventHander from '~~/server/util/defineAuthenticatedEventHandler';
import { getBookTitleByWorkId } from '~~/server/util/openlibrary';
import { InsertReviewSchema, ReviewSchemaType } from '~~/shared/schemas'

export default defineAuthenticatedEventHander(async (event) => {
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

    const newReview = new Review(reviewData);
    
    const result = await newReview.save()
    return result;
});