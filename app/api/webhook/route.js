import { Webhook } from 'svix'
import { headers } from 'next/headers'

import user from '@/app/_lib/_models/user';

export async function POST(req) {
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET
    if (!WEBHOOK_SECRET) {
        return new Response('Error occured', {
            status: 500
        })
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

    if (event.type === 'user.created') {
        const { id: userId } = event.data;
        const userAlreadyExist = await user.findOne({ userId }).exec();
        if (userAlreadyExist) {
            return new Response('User already exist', {
                status: 400
            });
        }

        const _id = `monarchUser_${nanoid(16)}`;
        const clerk = {
            userId: event.data.id,
            firstName: event.data.first_name,
            lastName: event.data.last_name,
            email: event.data.email_addresses[0].email_address,
            profileImageURL: event.data?.image_url || '',
        }
        const newUser = new user({
            _id,
            clerk
        });
        const result = await newUser.save();
        if (result) {
            return new Response('User created successfully', { status: 200 })
        }
        return new Response('Something went wrong with the system! Try again!', { status: 500 })
    }

    if (event.type === 'user.deleted') {
        const { id: userId } = event.data;

        const selectedUser = await user.findOne({ userId }).exec();
        // HANDLE DELETE ALL WITH ID
        const result = await user.deleteOne({})
    }
}