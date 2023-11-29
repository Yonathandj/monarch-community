import { nanoid } from "nanoid";

import post from "./_models/post";

import connectDB from "./connectDB"

export const updateUnpublishedPost = async ({ userId, title, tags, content, headerImageURL }) => {
    try {
        connectDB();
        const response = await post.updateOne({ "clerk.userId": userId, isPublished: false }, { data: { title, tags, content, headerImageURL } }).exec()
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
            _id, userId, data: { title, tags, content, headerImageURL }, isPublished: false
        })
        const response = await newUnpublishedPost.save();
        return response;
    } catch (error) {
        throw new Error(`Failed to add new unpublished post! ${error}`)
    }
}
