import { z } from 'zod';

export const addUserValidationSchema = z.object({
    userId: z.string().trim(),
    fullName: z.string().trim(),
    email: z.string().trim().email(),
    profileImageURL: z.string().trim().url(),
})

export const postValidationSchema = z.object({
    userId: z.string().trim(),
    headerImageURL: z.any().optional(),
    title: z.string().trim().optional(),
    tags: z.array(z.string()).optional(),
    content: z.string().trim().optional(),
})

export const likeValidationSchema = z.object({
    userId: z.string().trim(),
    postId: z.string().trim(),
})

export const bookmarkValidationSchema = z.object({
    userId: z.string().trim(),
    postId: z.string().trim(),
})