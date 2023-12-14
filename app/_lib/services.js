import { nanoid } from "nanoid";

import like from "./_models/like";
import post from "./_models/post";
import user from "./_models/user";
import bookmark from "./_models/bookmark";

import connectDB from "./connectDB"

export const addNewUserService = async ({ _id, email, fullName, profileImageURL }) => {
    try {
        connectDB();
        const newUser = new user({
            _id, clerk: { email, fullName, profileImageURL }
        })
        const response = await newUser.save();
        return response;
    } catch (error) {
        throw new Error(`Failed to update unpublished post! ${error}`)
    }
}

export const updateUnpublishedPostService = async ({ userId, title, tags, content, headerImageURL }) => {
    try {
        connectDB();
        const data = {
            "data.tags": tags,
            "data.title": title,
            "data.content": content,
            "data.headerImageURL": headerImageURL,
        }
        const response = await post.updateOne({ userId, isPublished: false }, data).exec()
        return response;
    } catch (error) {
        throw new Error(`Failed to update unpublished post! ${error}`)
    }
}

export const addUnpublishedPostService = async ({ userId, title, tags, content, headerImageURL }) => {
    try {
        connectDB();
        const _id = `post_${nanoid(16)}`;
        const newUnpublishedPost = new post({
            _id, userId, data: { title, tags, content, headerImageURL }
        })
        const response = await newUnpublishedPost.save();
        return response;
    } catch (error) {
        throw new Error(`Failed to add new unpublished post! ${error}`)
    }
}

export const publishPostService = async (userId) => {
    try {
        connectDB();
        await post.updateOne({ userId, isPublished: false }, { isPublished: true }).exec()
    } catch (error) {
        throw new Error(`Failed to add new unpublished post! ${error}`)
    }
}

export const addLikeService = async (userId, postId) => {
    try {
        connectDB();
        const _id = `like_${nanoid(16)}`;
        const newLike = new like({ _id, userId, postId })
        await newLike.save();
    } catch (error) {
        throw new Error(`Failed to add like! ${error}`)
    }
}

export const deleteLikeService = async (userId, postId) => {
    try {
        connectDB();
        await like.deleteOne({ userId, postId });
    } catch (error) {
        throw new Error(`Failed to delete like! ${error}`)
    }
}

export const addBookmarkService = async (userId, postId) => {
    try {
        connectDB();
        const _id = `bookmark_${nanoid(16)}`;
        const newBookmark = new bookmark({ _id, userId, postId })
        await newBookmark.save();
    } catch (error) {
        throw new Error(`Failed to add bookmark! ${error}`)
    }
}

export const deleteBookmarkService = async (userId, postId) => {
    try {
        connectDB();
        await bookmark.deleteOne({ userId, postId });
    } catch (error) {
        throw new Error(`Failed to delete bookmark! ${error}`)
    }
}

export const updateUserService = async ({ _id, email, fullName, profileImageURL, work, location, instagram, facebook, twitter, tiktok, description }) => {
    try {
        connectDB();
        const data = profileImageURL ? {
            'clerk.email': email,
            'clerk.fullName': fullName,
            'clerk.profileImageURL': profileImageURL,
            'profile.work': work,
            'profile.location': location,
            'profile.description': description,
            'profile.socialMedia.tiktok': tiktok,
            'profile.socialMedia.twitter': twitter,
            'profile.socialMedia.facebook': facebook,
            'profile.socialMedia.instagram': instagram,
        } : {
            'clerk.email': email,
            'clerk.fullName': fullName,
            'profile.work': work,
            'profile.location': location,
            'profile.description': description,
            'profile.socialMedia.tiktok': tiktok,
            'profile.socialMedia.twitter': twitter,
            'profile.socialMedia.facebook': facebook,
            'profile.socialMedia.instagram': instagram,
        }
        await user.updateOne({ _id }, data);
    } catch (error) {
        throw new Error(`Failed to delete bookmark! ${error}`)
    }
}

export const deleteAllBookmarkByPostId = async (postId) => {
    try {
        connectDB();
        await bookmark.deleteMany({ postId });
    } catch (error) {
        throw new Error(`Failed to delete bookmark(s)! ${error}`)
    }
}

export const deleteAllLikeByPostId = async (postId) => {
    try {
        connectDB();
        await like.deleteMany({ postId });
    } catch (error) {
        throw new Error(`Failed to delete like(s)! ${error}`)
    }
}

export const deletePostByPostId = async (postId) => {
    try {
        connectDB();
        await post.deleteOne({ _id: postId });
    } catch (error) {
        throw new Error(`Failed to delete post! ${error}`)
    }
}

export const updatePostByPostId = async ({ postId, title, tags, content, headerImageURL }) => {
    try {
        connectDB();
        const data = {
            'data.tags': tags,
            'data.title': title,
            'data.content': content,
            'data.headerImageURL': headerImageURL,
        }
        await post.updateOne({ _id: postId }, data);
    } catch (error) {
        throw new Error(`Failed to delete post! ${error}`)
    }
}