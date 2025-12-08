import { defineMongooseModel } from '#nuxt/mongoose';

export const User = defineMongooseModel({
    name: 'User',
    schema: {
        username: {
            type: 'string',
            required: true,
        },
        password: {
            type: 'string',
            required: true,
        }
    }
});

