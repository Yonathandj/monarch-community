import user from "./_models/user"
import post from "./_models/post"
import connectDB from "./connectDB"

import { unstable_noStore as noStore } from "next/cache"

export const getUserById = async (userId) => {
    try {
        connectDB()
        const selectedUser = await user.findOne({ "clerk.userId": userId }).exec();
        return selectedUser;
    } catch (error) {
        throw new Error('Failed to fetch current user!');
    }
}

export const getTotalUsers = async () => {
    try {
        connectDB()
        const totalUsers = await user.find().estimatedDocumentCount().exec();
        return totalUsers;
    } catch (error) {
        throw new Error('Failed to fetch current user!');
    }
}

export const getUnpublishedPost = async (userId) => {
    noStore()
    try {
        connectDB()
        const unpublishedPost = await post.findOne({ userId, isPublished: false }).exec();
        return unpublishedPost;
    } catch (error) {
        throw new Error('Failed to fetch current user!');
    }
}