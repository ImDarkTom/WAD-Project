import z from 'zod';

export const ReviewSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters!").max(256, "Title must be at most 256 characters!"),
    book: z.object({
        title: z.string(),
        workId: z.string(),
    }),
    content: z.string().min(1, "Content must not be blank!").max(3000, "Too long!"),
    rating: z.number().min(0).max(10),
    pros: z.array(z.string()).optional(),
    cons: z.array(z.string()).optional(),
    author: z.string(),
});

export type ReviewSchemaType = z.infer<typeof ReviewSchema>;


// When inserting, omit author since the backend handles setting that for us.
export const InsertReviewSchema = ReviewSchema
    .omit({
        author: true,
    }).extend({
        book: z.string(),
    });

export type InsertReviewSchemaType = z.infer<typeof InsertReviewSchema>;


// The review after its been populated before being sent to the client for rendering.
export const PopulatedReviewSchema = ReviewSchema.extend({
    author: z.object({
        '_id': z.string(),
        username: z.string(),
    }),
    book: z.object({
        title: z.string(),
        workId: z.string(),
    }),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export type PopulatedReviewSchemaType = z.infer<typeof PopulatedReviewSchema>;