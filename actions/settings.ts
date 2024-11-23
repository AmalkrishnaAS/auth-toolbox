"use server"
import * as z from 'zod';
import { SettingsSchema } from '@/schema';
import { getUserById } from '@/data/user';
import { getUserByEmail } from '@/data/user';
import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { generateVerificationToken } from '@/lib/tokens';
import { sendVerificationEmail } from '@/mail';
import bcrypt from 'bcryptjs';

export const settings = async (values:z.infer<typeof SettingsSchema>) => {
    const user = await currentUser();
    if(!user) {
        return {
            error:"Unauthorized"
        }
    }
    const dbUser = await getUserById(user.id as string);
    if(!dbUser) {
        return {
            error:"User Not Found"
        }
    }

    // if(user.isOAuth) {
    //     values.email = undefined
    //     values.password = undefined
    //     values.newPassword = undefined
    //     values.isTwoFactorEnabled = undefined
    // }

    if(values.email && values.email !== user.email) {
        const existingUser = await getUserByEmail(values.email)
        
        // Only block if the email exists AND belongs to a different user
        if(existingUser && existingUser.id !== user.id) {
            return {
                error: "Email already in use by another account"
            }
        }

        // Generate and send verification token
        const verificationToken = await generateVerificationToken(values.email)
        await sendVerificationEmail(verificationToken.email, verificationToken.token)
        
        return {
            success: "Verification email sent! Please check your inbox."
        }
    }

    if( values.password && values.newPassword) {
        if (!dbUser.password) {
            return {
                error: "No password set for this user"
            }
        }
        
        const passwordsMatch = await bcrypt.compare(values.password, dbUser.password || '')
        console.log(passwordsMatch)
        if(!passwordsMatch) {
            return {
                error: "Incorrect Password"
            }
        }

        const hashedPassword = await bcrypt.hash(values.newPassword, 10)
        values.password = hashedPassword
        values.newPassword = undefined
    }

    await db.user.update({
        where:{
            id:dbUser.id
        },
        data:{
            ...values
        }
    })

    return {
        success:"Settings updated successfully"
    }
}
