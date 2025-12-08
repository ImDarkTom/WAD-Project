import z from "zod";

export const ReviewSchema = z.object({
    title: z.string()
});