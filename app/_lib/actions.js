"use server"

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { getBookmarkById, getLikeById, getPublishedPostById, getUnpublishedPost, getUserById } from "./data";
import { bookmarkValidationSchema, likeValidationSchema, postValidationSchema, userValidationSchema } from "./validations"
import { addBookmarkService, addLikeService, deleteBookmarkService, deleteLikeService, publishPostService, updateUserService } from "./services";

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
                errorUnpublishedPost: 'No unpublished post is created. Please create first!'
            }
        } else {
            if (!unpublishedPost.data.title) {
                return {
                    errorTitle: 'No title found. Please provide a suitable title first!'
                }
            } else {
                await publishPostService(userId);
            }
        }
    } catch (error) {
        throw new Error(`Something went wrong with the system. Try again! ${error}`)
    }
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

export async function userProfileAction(userId, prevState, formData) {
    const validUserValidationSchema = formData.get("profileImageURL")?.size === 0 && formData.get("profileImageURL")?.name === 'undefined' ? userValidationSchema.omit({ profileImageURL: true }) : userValidationSchema;

    const validationResult = validUserValidationSchema.safeParse({
        userId,
        email: formData.get("email"),
        tiktok: formData.get("tiktok"),
        twitter: formData.get("twitter"),
        fullName: formData.get("fullName"),
        facebook: formData.get("facebook"),
        instagram: formData.get("instagram"),
        description: formData.get("description"),
        profileImageURL: formData.get("profileImageURL"),
    })
    if (!validationResult.success) {
        return {
            errorValidation: validationResult.error.flatten().fieldErrors
        }
    }
    try {
        const { userId, email, fullName, profileImageURL, description, instagram, facebook, twitter, tiktok } = validationResult.data;
        const selectedUser = await getUserById(userId);
        if (!selectedUser) {
            throw new Error(`You are not sign up. Please sign up first! ${error}`)
        }
        await updateUserService({ userId, email, fullName, profileImageURL, description, instagram, facebook, twitter, tiktok })
    } catch (error) {
        throw new Error(`Something went wrong with the system. Try again! ${error}`)
    }
    revalidatePath('/setting/profile')
    return {
        successMessage: `Profile user successfully updated`
    }
}