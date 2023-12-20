import like from "./_models/like";
import post from "./_models/post";
import user from "./_models/user";
import bookmark from "./_models/bookmark";

import connectDB from "./connectDB";

import { unstable_noStore as noStore } from "next/cache";

export const getUserByUserId = async (_id) => {
    noStore()
    try {
        await connectDB()
        const selectedUser = await user.findOne({ _id }).exec();
        return selectedUser;
    } catch (error) {
        throw new Error(`Failed to fetch user! ${error}`);
    }
}

export const getTotalUsers = async () => {
    noStore()
    try {
        await connectDB()
        const totalUsers = await user.countDocuments({}).exec();
        return totalUsers;
    } catch (error) {
        throw new Error(`Failed to fetch total users! ${error}`);
    }
}

export const getUnpublishedPostByUserId = async (userId) => {
    noStore()
    try {
        await connectDB()
        const unpublishedPost = await post.findOne({ userId, isPublished: false }).exec();
        return unpublishedPost;
    } catch (error) {
        throw new Error(`Failed to fetch unpublished post! ${error}`);
    }
}

export const getAllPostByUserId = async (userId) => {
    noStore()
    try {
        await connectDB()
        const allPost = await post.find({ userId }).exec();
        return allPost;
    } catch (error) {
        throw new Error(`Failed to fetch posts! ${error}`);
    }
}

export const getPostByPostId = async (postId) => {
    noStore()
    try {
        await connectDB()
        const selectedPost = await post.findOne({ _id: postId }).exec();
        return selectedPost;
    } catch (error) {
        throw new Error(`Failed to fetch post! ${error}`);
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

export const getPublishedPostByPostId = async (postId) => {
    noStore()
    try {
        await connectDB()
        const publishedPost = await post.findOne({ _id: postId }).populate('userId').exec();
        return publishedPost;
    } catch (error) {
        throw new Error(`Failed to fetch published post! ${error}`);
    }
}

export const getLikeByUserIdAndPostId = async (userId, postId) => {
    noStore()
    try {
        await connectDB()
        const likeSelectedUser = await like.findOne({ userId, postId }).exec();
        return likeSelectedUser;
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

export const getLikesByUserId = async (userId, populateKey = null, populateValue = null) => {
    noStore()
    try {
        await connectDB()
        if (populateKey) {
            const likes = await like.find({ userId }).populate(populateKey, populateValue).exec();
            return likes;
        } else {
            const likes = await like.find({ userId }).exec();
            return likes;
        }
    } catch (error) {
        throw new Error(`Failed to fetch likes! ${error}`);
    }
}
export const getBookmarksByUserId = async (userId, populateKey = null, populateValue = null) => {
    noStore()
    try {
        await connectDB()
        if (populateKey) {
            const bookmarks = await bookmark.find({ userId }).populate(populateKey, populateValue).exec();
            return bookmarks;
        } else {
            const bookmarks = await bookmark.find({ userId }).exec();
            return bookmarks;
        }
    } catch (error) {
        throw new Error(`Failed to fetch bookmarks! ${error}`);
    }
}

export const getBookmarkByUserIdAndPostId = async (userId, postId) => {
    noStore()
    try {
        await connectDB()
        const bookmarkSelectedUser = await bookmark.findOne({ userId, postId }).exec();
        return bookmarkSelectedUser;
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