import { getUnpublishedPost } from "@/app/_lib/data";

import { addUnpublishedPostService, updateUnpublishedPostService } from "@/app/_lib/services";

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
                const response = await updateUnpublishedPostService({ userId, title, tags, content, headerImageURL });
                if (response) {
                    return new Response('unpublished post successfully updated', { status: 200 });
                }
            } else {
                const response = await addUnpublishedPostService({ userId, title, tags, content, headerImageURL })
                if (response) {
                    return new Response('New unpublished post successfully added', { status: 200 });
                }
            }
        }
    } catch (error) {
        return new Response('Something went wrong with the system! Try again!', { status: 500 })
    }
}


export async function GET(request) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const by = searchParams.get('by');

        if (!by) {
            return Response.json({
                message: 'Bad request! Please provide valid data'
            }, { status: 400 });
        }

        const unpublishedPost = await getUnpublishedPost(by);
        if (unpublishedPost) {
            return Response.json({
                message: 'Successfully fetch unpublished post data from user',
                data: unpublishedPost.data
            }, { status: 200 });
        } else {
            return Response.json({
                message: 'Failed to fetch unpublished post data from user. Related data not found!',
            }, { status: 404 });
        }
    } catch (error) {
        return Response.json({ message: 'Something went wrong with the system! Try again!' }, { status: 500 })
    }
}