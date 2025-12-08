import { signInUser } from '~~/server/util/user';
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

    const { data, error } = await signInUser(bodyParse.data.username, bodyParse.data.password);
    
    if (error) {
        return sendError(event, createError({
            status: error.code,
            statusMessage: error.text,
        }));
    }

    setCookie(event, 'token', data);
    setCookie(event, 'username', bodyParse.data.username);
    
    return { data: 'ok' };
});