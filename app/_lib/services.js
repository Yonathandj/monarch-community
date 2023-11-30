import { nanoid } from "nanoid";

import post from "./_models/post";
import user from "./_models/user";

import connectDB from "./connectDB"

export const addNewUser = async ({ userId, fullName, email, profileImageURL }) => {
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

export const updateUnpublishedPost = async ({ userId, title, tags, content, headerImageURL }) => {
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

export const addUnpublishedPost = async ({ userId, title, tags, content, headerImageURL }) => {
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