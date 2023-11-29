import { getUnpublishedPost } from "@/app/_lib/data";

import { addUnpublishedPost, updateUnpublishedPost } from "@/app/_lib/services";

import { postValidationSchema } from "@/app/_lib/validations";

export async function POST(request) {
    try {
        const { userId, unpublishedPost } = await request.json();

        const validationResult = postValidationSchema.safeParse({ userId, ...unpublishedPost });
        if (!validationResult.success) {
            return new Response('Bad request! Please provide valid data', { status: 400 });
        }
        if (validationResult.success) {
            const { userId, title, tags, content, headerImageURL } = validationResult.data;

            const unpublishedPostInDatabase = await getUnpublishedPost(userId);

            if (unpublishedPostInDatabase) {
                const response = await updateUnpublishedPost({ userId, title, tags, content, headerImageURL });
                if (response) {
                    return new Response('unpublished post successfully updated', { status: 200 });
                }
            } else {
                const response = await addUnpublishedPost({ userId, title, tags, content, headerImageURL })
                if (response) {
                    return new Response('New unpublished post successfully added', { status: 200 });
                }
            }
        }
    } catch (error) {
        return new Response('Something went wrong with the system! Try again!', { status: 500 })
    }
}