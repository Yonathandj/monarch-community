import { nanoid } from "nanoid";

import post from "./_models/post";

import connectDB from "./connectDB";

export async function addUnpublishedPostService({ userId, headerImageURL = '', title = '', tags = [], content = [] }) {
    try {
        connectDB();
        const _id = `post-${nanoid(16)}`;
        const isPublished = false;

        const newUnpublishedPost = new post({
            _id, userId, data: { headerImageURL, title, tags, content }, isPublished
        })
        const response = await newUnpublishedPost.save()
        return response;
    } catch (error) {
        throw new Error(`Something went wrong with the system. Try again! ${error}`)
    }
}