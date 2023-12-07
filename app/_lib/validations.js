import { z } from 'zod';

export const userValidationSchema = z.object({
    _id: z.string().trim(),
    email: z.string().trim().email().endsWith('.com').min(13),
    fullName: z.string().trim().min(3),
    profileImageURL: z.string().trim().url(),
    work: z.string().trim().optional(),
    location: z.string().trim().optional(),
    tiktok: z.string().trim().optional(),
    twitter: z.string().trim().optional(),
    facebook: z.string().trim().optional(),
    instagram: z.string().trim().optional(),
    description: z.string().trim().optional(),
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