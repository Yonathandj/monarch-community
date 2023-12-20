import { getPublishedPostByPostId } from "@/app/_lib/data";

export async function GET(request) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const by = searchParams.get('by');

        if (!by) {
            return Response.json({
                message: 'Bad request! Please provide valid data'
            }, { status: 400 });
        }

        const publishedPost = await getPublishedPostByPostId(by);
        if (publishedPost) {
            return Response.json({
                message: 'Successfully fetch published post data from user',
                data: publishedPost.data
            }, { status: 200 });
        } else {
            return Response.json({
                message: 'Failed to fetch published post data from user. Related data not found!',
            }, { status: 404 });
        }
    } catch (error) {
        return Response.json({ message: 'Something went wrong with the system! Try again!' }, { status: 500 })
    }
}