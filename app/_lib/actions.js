"use server"

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { likeValidationSchema, postValidationSchema } from "./validations"

import { getLikeById, getPublishedPostById, getUnpublishedPost } from "./data";
import { addLikeService, deleteLikeService, publishPostService } from "./services";

export async function publishPostAction(userId, prevState, formData) {
    const validationResult = postValidationSchema.safeParse({ userId })
    if (!validationResult.success) {
        return {
            errorValidation: validationResult.error.flatten().fieldErrors
        }
    }
    try {
        const { userId } = validationResult.data;
        const unpublishedPost = await getUnpublishedPost(userId);
        if (!unpublishedPost) {
            return {
                errorNoUnpublishedPost: 'No unpublished post is created. Please create first!'
            }
        } else {
            if (!unpublishedPost.data.title) {
                return {
                    errorNoTitle: 'No title found. Please provide a suitable title first!'
                }
            } else {
                await publishPostService(userId);
            }
        }
    } catch (error) {
        return {
            errorSystem: 'Something went wrong with the system. Try again!'
        }
    }
    revalidatePath('/')
    redirect('/')
}

export async function likeAction(userId, postId, formData) {
    const validationResult = likeValidationSchema.safeParse({ userId, postId });
    if (!validationResult.success) {
        return {
            errorValidation: validationResult.error.flatten().fieldErrors
        }
    }
    try {
        const { userId, postId } = validationResult.data
        const publishedPost = await getPublishedPostById(postId)
        if (!publishedPost) {
            return {
                errorNoPublishedPost: 'No published post is created. Please create first!'
            }
        } else {
            const isLiked = await getLikeById(userId, postId);
            if (isLiked) {
                await deleteLikeService(userId, postId);
            } else {
                await addLikeService(userId, postId)
            }
        }
    } catch (error) {
        return {
            errorSystem: 'Something went wrong with the system. Try again!'
        }
    }
    revalidatePath('/posts/[id]', 'page')
}