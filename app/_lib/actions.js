"use server"

import connectDB from "./connectDB"

import { getUnpublishedPost } from "./data";

import { addUnpublishedPostService } from "./services";

export async function handleUnpublishedPostAction({ userId, headerImageURL, title, tags, content }) {
    try {
        connectDB();
        const unpublishedPost = await getUnpublishedPost(userId);
        if (!unpublishedPost) {
            addUnpublishedPostService({ userId, headerImageURL, title, tags, content });
        }
    } catch (error) {
        throw new Error(`Something went wrong with the system. Try again! ${error}`)
    }
}