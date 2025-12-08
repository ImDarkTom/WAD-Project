import { defineMongooseModel } from '#nuxt/mongoose';
import { nanoid } from 'nanoid';

export const User = defineMongooseModel({
    name: 'User',
    schema: {
        username: {
            type: 'string',
            required: true,
            unique: true,
        },
        password: {
            type: 'string',
            required: true,
        },
        token: {
            type: 'string',
            default: nanoid()
        }
    }
});

