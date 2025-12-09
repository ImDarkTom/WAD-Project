import z from 'zod';

export const ReviewSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters!").max(256, "Title must be at most 256 characters!"),
    content: z.string().min(1, "Content must not be blank!").max(3000, "Too long!"),
    rating: z.number().min(0).max(10),
    pros: z.array(z.string()).optional(),
    cons: z.array(z.string()).optional()
});

export type ReviewSchemaType = z.infer<typeof ReviewSchema>;