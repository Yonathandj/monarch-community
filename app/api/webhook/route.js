import { Webhook } from 'svix'
import { headers } from 'next/headers'

import { getUserById } from '@/app/_lib/data';
import { addNewUser } from '@/app/_lib/services';
import { userValidationSchema } from '@/app/_lib/validations';

export async function POST(req) {
    try {
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
            const validationResult = userValidationSchema.safeParse({
                userId: event.data.id,
                fullName: event.data?.first_name || event.data?.last_name ? `${event.data?.first_name || ''} ${event.data?.last_name || ''}` : event.data.email_addresses[0].email_address.split('@')[0],
                email: event.data.email_addresses[0].email_address,
                profileImageURL: event.data.image_url,
            })
            if (!validationResult.success) {
                return new Response('Bad request! Please provide valid data', {
                    status: 400
                });
            }
            if (validation.success) {
                const { userId, fullName, email, profileImageURL } = validationResult.data;
                const userAlreadyExist = await getUserById(userId);
                if (userAlreadyExist) {
                    return new Response('User already exist', {
                        status: 400
                    });
                } else {
                    const response = await addNewUser({ userId, fullName, email, profileImageURL });
                    if (response) {
                        return new Response('New user successfully created', {
                            status: 200
                        });
                    }
                }
            }
        }
    } catch (error) {
        return new Response('Something went wrong with the system! Try again', {
            status: 500
        });
    }
}