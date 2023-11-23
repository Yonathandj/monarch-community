import { z } from 'zod';

export const userValidationSchema = z.object({
    userId: z.string().trim(),
    firstName: z.string.trim(),
    lastName: z.string.trim(),
    email: z.string().trim().email(),
    profileImageURL: z.string().trim().url().optional(),
})