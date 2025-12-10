import z from "zod";

export const InsertUserSchema = z.object({
    username: z.string(),
    password: z.string().min(8),
});

export const UserSchema = InsertUserSchema.extend({
    token: z.string(),
});

export type UserSchemaType = z.infer<typeof UserSchema>;