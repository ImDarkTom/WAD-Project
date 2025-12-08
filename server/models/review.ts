import { defineMongooseModel } from '#nuxt/mongoose';

export const Review = defineMongooseModel({
    name: 'Review',
    schema: {
        title: {
            type: 'string',
            required: true,
        }
    }
});

