"use server"

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { getUnpublishedPost } from "./data";
import { publishPostService } from "./services";
import { postValidationSchema } from "./validations"

export async function publishPostAction(userId, prevState, formData) {
    const validationResult = postValidationSchema.safeParse({ userId })
    if (!validationResult.success) {
        return {
            errorValidation: validationResult.error.flatten().fieldErrors
        }
    }
    try {
        const { userId } = validationResult.data;
        const unpublishedPost = await getUnpublishedPost(userId);
        if (!unpublishedPost) {
            return {
                errorNoUnpublishedPost: 'No unpublished post are created Please create first!'
            }
        } else {
            if (!unpublishedPost.data.title) {
                return {
                    errorNoTitle: 'No title found. Please provide a suitable title first!'
                }
            } else {
                await publishPostService(userId);
            }
        }
    } catch (error) {
        return {
            errorSystem: 'Something went wrong with the system. Try again!'
        }
    }
    revalidatePath('/')
    redirect('/')
}