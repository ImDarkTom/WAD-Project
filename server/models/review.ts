import mongoose, { Schema } from 'mongoose';

// https://stackoverflow.com/questions/26008555/creating-a-foreign-key-relationship-in-mongoose
// https://mongoosejs.com/docs/guide.html#timestamps

const reviewSchema = new Schema({
    title: {
        type: 'string',
        required: true,
        minLength: 3,
        maxLength: 256,
    },
    content: {
        type: 'string',
        required: true,
        minLength: 1,
        maxLength: 3000,
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 10,
    },
    pros: {
        type: [String],
    },
    cons: {
        type: [String],
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
}, {
    timestamps: true,
});

export const Review = mongoose.model('Review', reviewSchema);