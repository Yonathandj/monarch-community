import like from "./_models/like";
import post from "./_models/post";
import user from "./_models/user";
import bookmark from "./_models/bookmark";

import connectDB from "./connectDB";

import { unstable_noStore as noStore } from "next/cache";

export const getUserById = async (userId) => {
    noStore()
    try {
        await connectDB()
        const selectedUser = await user.findOne({ "clerk.userId": userId }).exec();
        return selectedUser;
    } catch (error) {
        throw new Error(`Failed to fetch current user! ${error}`);
    }
}

export const getTotalUsers = async () => {
    noStore()
    try {
        await connectDB()
        const totalUsers = await user.find().estimatedDocumentCount().exec();
        return totalUsers;
    } catch (error) {
        throw new Error(`Failed to fetch current user! ${error}`);
    }
}

export const getUnpublishedPost = async (userId) => {
    noStore()
    try {
        await connectDB()
        const unpublishedPost = await post.findOne({ userId, isPublished: false }).exec();
        return unpublishedPost;
    } catch (error) {
        throw new Error(`Failed to fetch unpublished post! ${error}`);
    }
}

export const getPublishedPosts = async () => {
    noStore()
    try {
        await connectDB()
        const publishedPosts = await post.find({ isPublished: true }).populate('userId', { clerk: 1, profile: 1, createdAt: 1 }).exec();
        return publishedPosts;
    } catch (error) {
        throw new Error(`Failed to fetch published posts! ${error}`);
    }
}

export const getPublishedPostById = async (postId) => {
    noStore()
    try {
        await connectDB()
        const publishedPost = await post.findOne({ _id: postId }).exec();
        return publishedPost;
    } catch (error) {
        throw new Error(`Failed to fetch published post! ${error}`);
    }
}

export const getLikeById = async (userId, postId) => {
    noStore()
    try {
        await connectDB()
        const likeSelectedUser = await like.findOne({ userId, postId }).exec();
        return likeSelectedUser;
    } catch (error) {
        throw new Error(`Failed to fetch like! ${error}`);
    }
}

export const getTotalLikes = async () => {
    noStore()
    try {
        await connectDB()
        const likes = await like.find().estimatedDocumentCount().exec();
        return likes;
    } catch (error) {
        throw new Error(`Failed to fetch likes! ${error}`);
    }
}

export const getBookmarkById = async (userId, postId) => {
    noStore()
    try {
        await connectDB()
        const bookmarkSelectedUser = await bookmark.findOne({ userId, postId }).exec();
        return bookmarkSelectedUser;
    } catch (error) {
        throw new Error(`Failed to fetch bookmark! ${error}`);
    }
}

export const getTotalBookmarks = async () => {
    noStore()
    try {
        await connectDB()
        const bookmarks = await bookmark.find().estimatedDocumentCount().exec();
        return bookmarks;
    } catch (error) {
        throw new Error(`Failed to fetch bookmarks! ${error}`);
    }
}