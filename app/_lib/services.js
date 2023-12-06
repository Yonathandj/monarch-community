import { nanoid } from "nanoid";

import like from "./_models/like";
import post from "./_models/post";
import user from "./_models/user";
import bookmark from "./_models/bookmark";

import connectDB from "./connectDB"

export const addNewUserService = async ({ userId, fullName, email, profileImageURL }) => {
    try {
        connectDB();
        const _id = `monarchUserId-${nanoid(16)}`;
        const newUser = new user({
            _id, clerk: { userId, fullName, email, profileImageURL }
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
        const _id = `post-${nanoid(16)}`;
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
        const _id = `like-${nanoid(16)}`;
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
        const _id = `bookmark-${nanoid(16)}`;
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

export const updateUserService = async ({ userId, email, fullName, profileImageURL, description, instagram, facebook, twitter, tiktok }) => {
    try {
        connectDB();
        const data = profileImageURL ? {
            'clerk.email': email,
            'clerk.fullName': fullName,
            'clerk.profileImageURL': profileImageURL,
            'profile.description': description,
            'profile.socialMedia.tiktok': tiktok,
            'profile.socialMedia.twitter': twitter,
            'profile.socialMedia.facebook': facebook,
            'profile.socialMedia.instagram': instagram,
        } : {
            'clerk.email': email,
            'clerk.fullName': fullName,
            'profile.description': description,
            'profile.socialMedia.tiktok': tiktok,
            'profile.socialMedia.twitter': twitter,
            'profile.socialMedia.facebook': facebook,
            'profile.socialMedia.instagram': instagram,
        }
        const response = await user.updateOne({ 'clerk.userId': userId }, data);
        return response;
    } catch (error) {
        throw new Error(`Failed to delete bookmark! ${error}`)
    }
}