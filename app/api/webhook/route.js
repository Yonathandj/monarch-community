import { Webhook } from 'svix'
import { headers } from 'next/headers'

export async function POST(req) {
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET
    if (!WEBHOOK_SECRET) {
        throw new Error('Please add webhook secret to .env')
    }

    const headerPayload = headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error occured - no svix headers', {
            status: 400
        })
    }

    let event

    const bodyPayload = await req.json()
    const bodyPayloadStringified = JSON.stringify(bodyPayload);

    const webhook = new Webhook(WEBHOOK_SECRET);

    try {
        event = webhook.verify(bodyPayloadStringified, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        })
    } catch (err) {
        console.error('Error verifying webhook:', err);
        return new Response('Error occured', {
            status: 400
        })
    }

    console.log(event)

    return new Response('Transaction success', { status: 200 })
}