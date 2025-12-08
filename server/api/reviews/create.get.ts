import { ReviewSchema } from '~~/shared/schemas'

export default defineEventHandler(async (event) => {
    const bodyParse = await readValidatedBody(event, ReviewSchema.safeParse);

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
        ...bodyParse.data
    });
    
    const result = await newReview.save()
    return result;
});