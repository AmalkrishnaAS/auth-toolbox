
'use server';
import { getUserByEmail } from "@/data/user"
import * as z from 'zod';
import { ResetSchema } from "@/schema";
import { generatePasswordResetToken } from '@/lib/tokens';
import { sendPasswordResetEmail } from '@/mail';


export const reset = async (values:z.infer<typeof ResetSchema>) => {
    console.log(values)

    const validatedFields = ResetSchema.safeParse(values)
    if(!validatedFields.success) {
        return {
            error: "Invalid Fields"
        }
    }

    const {email} = validatedFields.data

    const existingUser = await getUserByEmail(email)

    if(!existingUser) {
        return {
            error: "User not found"
        }
    }

    //todo send recovery email
    const resetToken = await generatePasswordResetToken(email)
    await sendPasswordResetEmail(resetToken.email,resetToken.token)
    

    return {
        success: "Recovery Email Sent"
    }
}