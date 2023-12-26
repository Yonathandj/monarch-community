"use server"

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { getBookmarkByUserIdAndPostId, getLikeByUserIdAndPostId, getPostByPostId, getPublishedPostByPostId, getUnpublishedPostByUserId, getUserByUserId } from "./data";
import { bookmarkValidationSchema, commentValidationSchema, likeValidationSchema, postValidationSchema, userValidationSchema } from "./validations"
import { addBookmarkService, addCommentService, addLikeService, deleteAllBookmarkByPostIdService, deleteAllLikeByPostIdService, deleteBookmarkService, deleteLikeService, deletePostByPostIdService, publishPostService, updatePostService, updateUserService } from "./services";

export async function publishPostAction(userId, prevState, formData) {
    const validationResult = postValidationSchema.safeParse({ userId })
    if (!validationResult.success) {
        return {
            errorValidation: validationResult.error.flatten().fieldErrors
        }
    }
    try {
        const { userId } = validationResult.data;
        const unpublishedPost = await getUnpublishedPostByUserId(userId);
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
    return redirect('/')
}

export async function toggleLikeAction(userId, postId, formData) {
    const validationResult = likeValidationSchema.safeParse({ userId, postId });
    if (!validationResult.success) {
        return revalidatePath('/posts/[id]', 'page');
    }
    try {
        const { userId, postId } = validationResult.data
        const publishedPostExistence = await getPublishedPostByPostId(postId)
        if (!publishedPostExistence) {
            return redirect('/');
        } else {
            const likedAlready = await getLikeByUserIdAndPostId(userId, postId);
            if (likedAlready) {
                await deleteLikeService({ userId, postId });
            } else {
                await addLikeService(userId, postId)
            }
        }
    } catch (error) {
        throw new Error(`Something went wrong with the system. Try again! ${error}`)
    }
    return revalidatePath('/posts/[id]', 'page')
}

export async function toggleBookmarkAction(userId, postId, formData) {
    const validationResult = bookmarkValidationSchema.safeParse({ userId, postId });
    if (!validationResult.success) {
        return revalidatePath('/posts/[id]', 'page');;
    }
    try {
        const { userId, postId } = validationResult.data
        const publishedPostExistence = await getPublishedPostByPostId(postId)
        if (!publishedPostExistence) {
            return redirect('/');
        } else {
            const bookmarkedAlready = await getBookmarkByUserIdAndPostId(userId, postId);
            if (bookmarkedAlready) {
                await deleteBookmarkService({ userId, postId });
            } else {
                await addBookmarkService(userId, postId)
            }
        }
    } catch (error) {
        throw new Error(`Something went wrong with the system. Try again! ${error}`)
    }
    return revalidatePath('/posts/[id]', 'page')
}

export async function updateUserProfileAction(_id, prevState, formData) {
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

        const userExistence = await getUserByUserId(_id);
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
        const postExistence = await getPostByPostId(postId);
        if (!postExistence) {
            return {
                errorPostExistence: 'Post you are going to delete not found! Please try again!'
            }
        } else {
            await Promise.all([deleteAllLikeByPostIdService(postId), deleteAllBookmarkByPostIdService(postId), deletePostByPostIdService(postId)])
        }
    } catch (error) {
        throw new Error(`Something went wrong with the system. Try again! ${error}`)
    }
    return revalidatePath('/setting/posts');
}

export async function updatePostAction(postId, updatedPublishedPost, prevState, formData) {
    const parsedUpdatedPublishedPost = JSON.parse(updatedPublishedPost);
    const headerImageURL = formData.get("validHeaderImageURL");

    if (!postId) {
        return revalidatePath('/setting/posts');
    }
    if (parsedUpdatedPublishedPost.title === "") {
        return {
            errorTitle: 'No title found. Please provide a suitable title first!'
        }
    }
    try {
        const postExistence = await getPostByPostId(postId);
        if (!postExistence) {
            return {
                errorPostExistence: 'Post you are going to update not found! Please try again!'
            }
        } else {
            await updatePostService({ postId, tags: parsedUpdatedPublishedPost.tags, title: parsedUpdatedPublishedPost.title, content: parsedUpdatedPublishedPost.content, headerImageURL })
        }
    } catch (error) {
        throw new Error(`Something went wrong with the system. Try again! ${error}`)
    }
    return redirect('/setting/posts')
}

export async function deleteLikeAction(likeId, formData) {
    if (!likeId) {
        return revalidatePath('/setting/likes');
    }
    try {
        await deleteLikeService({ likeId })
    } catch (error) {
        throw new Error(`Something went wrong with the system. Try again! ${error}`)
    }
    return revalidatePath('/setting/likes');
}

export async function deleteBookmarkAction(bookmarkId, formData) {
    if (!bookmarkId) {
        return revalidatePath('/setting/bookmarks');
    }
    try {
        await deleteBookmarkService({ bookmarkId })
    } catch (error) {
        throw new Error(`Something went wrong with the system. Try again! ${error}`)
    }
    return revalidatePath('/setting/bookmarks');
}

export async function addCommentAction(userId, parentCommentId, prevState, formData) {
    const validationResult = commentValidationSchema.safeParse(
        {
            userId,
            parentCommentId,
            content: formData.get('content'),
        }
    )
    if (!validationResult.success) {
        return {
            errorValidation: validationResult.error.flatten().fieldErrors
        }
    }
    try {
        const { userId, content, parentCommentId } = validationResult.data;
        await addCommentService(userId, content, parentCommentId)
    } catch (error) {
        throw new Error(`Something went wrong with the system. Try again! ${error}`)
    }
    return revalidatePath('/posts/[id]', 'page')
}
