"use server"

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { getBookmarkById, getLikeById, getPostById, getPublishedPostById, getUnpublishedPost, getUserById } from "./data";
import { bookmarkValidationSchema, likeValidationSchema, postValidationSchema, userValidationSchema } from "./validations"
import { addBookmarkService, addLikeService, deleteAllBookmarkByPostId, deleteAllLikeByPostId, deleteBookmarkService, deleteLikeService, deletePostByPostId, publishPostService, updateUserService } from "./services";

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
        const publishedPostExistence = await getPublishedPostById(postId)
        if (!publishedPostExistence) {
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
        const publishedPostExistence = await getPublishedPostById(postId)
        if (!publishedPostExistence) {
            return;
        } else {
            const bookmarkedAlready = await getBookmarkById(userId, postId);
            if (bookmarkedAlready) {
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

export async function userProfileAction(_id, prevState, formData) {
    const validUserValidationSchema = formData.get("profileImageURL")?.size === 0 && formData.get("profileImageURL")?.name === 'undefined' ? userValidationSchema.omit({ profileImageURL: true }) : userValidationSchema;

    const validationResult = validUserValidationSchema.safeParse({
        _id,
        email: formData.get("email"),
        fullName: formData.get("fullName"),
        profileImageURL: formData.get("profileImageURL"),
        work: formData.get("work"),
        location: formData.get("location"),
        tiktok: formData.get("tiktok"),
        twitter: formData.get("twitter"),
        facebook: formData.get("facebook"),
        instagram: formData.get("instagram"),
        description: formData.get("description"),
    })
    if (!validationResult.success) {
        return {
            errorValidation: validationResult.error.flatten().fieldErrors
        }
    }
    try {
        const { _id, email, fullName, profileImageURL, work, location, instagram, facebook, twitter, tiktok, description } = validationResult.data;

        const userExistence = await getUserById(_id);
        if (!userExistence) {
            throw new Error(`You are not sign up. Please sign up first! ${error}`)
        }
        await updateUserService({ _id, email, fullName, profileImageURL, work, location, instagram, facebook, twitter, tiktok, description })
    } catch (error) {
        throw new Error(`Something went wrong with the system. Try again! ${error}`)
    }
    revalidatePath('/setting/profile')
    return {
        successMessage: `Profile user successfully updated`
    }
}

export async function deletePostAction(postId, prevState, formData) {
    if (!postId) {
        return revalidatePath('/setting/posts');
    }
    try {
        const postExistence = await getPostById(postId);
        if (!postExistence) {
            return {
                errorPostExistence: 'Post you are going to delete not found! Please try again!'
            }
        } else {
            await Promise.all([deleteAllLikeByPostId(postId), deleteAllBookmarkByPostId(postId), deletePostByPostId(postId)])
        }
    } catch (error) {
        throw new Error(`Something went wrong with the system. Try again! ${error}`)
    }
    revalidatePath('/setting/posts');
}

export async function updatePostAction(postId, updatedPublishedPost, prevState, formData) {
    console.log(postId)
    console.log(updatedPublishedPost)
}