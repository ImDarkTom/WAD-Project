import { defineMongooseModel } from '#nuxt/mongoose';
import { Schema } from 'mongoose';

// https://stackoverflow.com/questions/26008555/creating-a-foreign-key-relationship-in-mongoose
// https://mongoosejs.com/docs/guide.html#timestamps

export const Review = defineMongooseModel({
    name: 'Review',
    schema: {
        title: {
            type: 'string',
            required: true,
        },
        content: {
            type: 'string',
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            min: 0,
            max: 10,
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
    },
    options: {
        timestamps: true,
    }
});