import post from "./_models/post";
import user from "./_models/user";

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