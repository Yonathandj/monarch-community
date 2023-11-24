import { z } from 'zod';

export const userValidationSchema = z.object({
    userId: z.string().trim(),
    fullName: z.string().trim(),
    email: z.string().trim().email(),
    profileImageURL: z.string().trim().url().optional(),
})