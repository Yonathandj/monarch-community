"use server"

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { getBookmarkById, getLikeById, getPublishedPostById, getUnpublishedPost } from "./data";
import { bookmarkValidationSchema, likeValidationSchema, postValidationSchema } from "./validations"
import { addBookmarkService, addLikeService, deleteBookmarkService, deleteLikeService, publishPostService } from "./services";

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
        return;
    }
    try {
        const { userId, postId } = validationResult.data
        const publishedPost = await getPublishedPostById(postId)
        if (!publishedPost) {
            return;
        } else {
            const likedAlready = await getLikeById(userId, postId);
            if (likedAlready) {
                await deleteLikeService(userId, postId);
            } else {
                await addLikeService(userId, postId)
            }
        }
    } catch (error) {
        throw new Error(`Something went wrong with the system. Try again! ${error}`)
    }
    revalidatePath('/posts/[id]', 'page')
}

export async function bookmarkAction(userId, postId, formData) {
    const validationResult = bookmarkValidationSchema.safeParse({ userId, postId });
    if (!validationResult.success) {
        return;
    }
    try {
        const { userId, postId } = validationResult.data
        const publishedPost = await getPublishedPostById(postId)
        if (!publishedPost) {
            return;
        } else {
            const bookmarkAlready = await getBookmarkById(userId, postId);
            if (bookmarkAlready) {
                await deleteBookmarkService(userId, postId);
            } else {
                await addBookmarkService(userId, postId)
            }
        }
    } catch (error) {
        throw new Error(`Something went wrong with the system. Try again! ${error}`)
    }
    revalidatePath('/posts/[id]', 'page')
}