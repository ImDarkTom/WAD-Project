import type { H3Event, H3EventContext } from 'h3';
import { UserSchemaType } from '~~/shared/schemas';
import { User } from '../models/user';

type AuthenticatedEvent = H3Event & {
    context: H3EventContext & {
        token: string | undefined;
        user: MongooseSchema<UserSchemaType>;
    }
};

export default function defineAuthenticatedEventHander<T>(
    handler: (event: AuthenticatedEvent) => T,
) {
    return defineEventHandler(async (event) => {
        const token = event.context.token;

        if (!token) {
            return sendError(event, createError({
                statusCode: 401,
                statusMessage: 'Unauthorized',
            }));
        }

        const user = await User.findOne({ token });

        if (!user) {
            return sendError(event, createError({
                statusCode: 401,
                statusMessage: 'Invalid Token',
            }));
        }

        event.context.user = user;

        return handler(event as AuthenticatedEvent);
    });
}