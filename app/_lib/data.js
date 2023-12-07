import like from "./_models/like";
import post from "./_models/post";
import user from "./_models/user";
import bookmark from "./_models/bookmark";

import connectDB from "./connectDB";

import { unstable_noStore as noStore } from "next/cache";

export const getUserById = async (_id) => {
    noStore()
    try {
        await connectDB()
        const currentUser = await user.findOne({ _id }).exec();
        return currentUser;
    } catch (error) {
        throw new Error(`Failed to fetch current user! ${error}`);
    }
}

export const getTotalUsers = async () => {
    noStore()
    try {
        await connectDB()
        const totalUsers = await user.countDocuments({}).exec();
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
        const publishedPosts = await post.find({ isPublished: true }).populate('userId').exec();
        return publishedPosts;
    } catch (error) {
        throw new Error(`Failed to fetch published posts! ${error}`);
    }
}

export const getPublishedPostById = async (postId) => {
    noStore()
    try {
        await connectDB()
        const publishedPost = await post.findOne({ _id: postId }).populate('userId').exec();
        return publishedPost;
    } catch (error) {
        throw new Error(`Failed to fetch published post! ${error}`);
    }
}

export const getLikeById = async (userId, postId) => {
    noStore()
    try {
        await connectDB()
        const likeCurrentUser = await like.countDocuments({ userId, postId }).exec();
        return likeCurrentUser;
    } catch (error) {
        throw new Error(`Failed to fetch like! ${error}`);
    }
}

export const getTotalLikesByPostId = async (postId) => {
    noStore()
    try {
        await connectDB()
        const likes = await like.countDocuments({ postId }).exec();
        return likes;
    } catch (error) {
        throw new Error(`Failed to fetch likes! ${error}`);
    }
}

export const getBookmarkById = async (userId, postId) => {
    noStore()
    try {
        await connectDB()
        const bookmarkCurrentUser = await bookmark.countDocuments({ userId, postId }).exec();
        return bookmarkCurrentUser;
    } catch (error) {
        throw new Error(`Failed to fetch bookmark! ${error}`);
    }
}

export const getTotalBookmarksByPostId = async (postId) => {
    noStore()
    try {
        await connectDB()
        const bookmarks = await bookmark.countDocuments({ postId }).exec();
        return bookmarks;
    } catch (error) {
        throw new Error(`Failed to fetch bookmarks! ${error}`);
    }
}