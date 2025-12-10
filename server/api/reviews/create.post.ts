import { Review } from '~~/server/models/review';
import defineAuthenticatedEventHander from '~~/server/util/defineAuthenticatedEventHandler';
import { InsertReviewSchema } from '~~/shared/schemas'

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

    const newReview = new Review({
        ...bodyParse.data,
        author: event.context.user._id,
    });
    
    const result = await newReview.save()
    return result;
});