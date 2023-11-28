export async function POST(request) {
    const requestPayload = await request.json();
    console.log(requestPayload);
    return new Response('Add new post success', { status: 200 })
}