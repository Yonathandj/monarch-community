import { z } from 'zod';

export const userValidationSchema = z.object({
    userId: z.string().trim(),
    fullName: z.string().trim(),
    email: z.string().trim().email(),
    profileImageURL: z.string().trim().url(),
})

export const postValidationSchema = z.object({
    userId: z.string().trim(),
    content: z.string().trim(),
    headerImageURL: z.any().optional(),
    title: z.string().trim().optional(),
    tags: z.array(z.string()).optional(),
})
