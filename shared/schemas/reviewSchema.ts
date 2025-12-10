import z from 'zod';

export const InsertReviewSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters!").max(256, "Title must be at most 256 characters!"),
    content: z.string().min(1, "Content must not be blank!").max(3000, "Too long!"),
    rating: z.number().min(0).max(10),
    pros: z.array(z.string()).optional(),
    cons: z.array(z.string()).optional()
});

export type InsertReviewSchemaType = z.infer<typeof InsertReviewSchema>;

export const ReviewSchema = InsertReviewSchema.extend({
    author: z.string(),
});

// The review after its been populated
export const PopulatedReviewSchema = InsertReviewSchema.extend({
    author: z.object({
        '_id': z.string(),
        username: z.string(),
    }),
});

export type PopulatedReviewSchemaType = z.infer<typeof PopulatedReviewSchema>;