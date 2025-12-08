import { User } from '~~/server/models/user';
import { UserSchema } from '~~/shared/schemas';

export default defineEventHandler(async (event) => {
    const bodyParse = await readValidatedBody(event, UserSchema.safeParse);

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

    const newUser = new User({
        ...bodyParse.data
    });
    
    const result = await newUser.save()
    return result;
});