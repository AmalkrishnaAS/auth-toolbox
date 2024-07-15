'use server';

import * as z from 'zod';
import { RegisterSchema } from '@/schema';
import bcrypt from 'bcryptjs'
import {db} from '@/lib/db';
import { getUserByEmail } from '@/data/user';
import { generateVerificationToken } from '@/lib/tokens';
import { sendVerificationEmail } from '@/mail';


export const  register=async (values:z.infer<typeof RegisterSchema>)  => {
    console.log(values)

    const validatedFields = RegisterSchema.safeParse(values)
    if(!validatedFields.success) {
        return {
            error: "Invalid Fields"
        }
    }

    const {email,name,password} = validatedFields.data
    const hashedPassword = await bcrypt.hash(password,10)

    const existingUser= await getUserByEmail(email)

    if(existingUser) {
        return {
            error: "User Already Exists"
        }
    }

    await db.user.create({
        data:{
            email,
            name,
            password:hashedPassword
        }
    })

    const verificationToken = await generateVerificationToken(email)

    await sendVerificationEmail(verificationToken.email,verificationToken.token)


    // return {
    //     success: "User Created"
    // }

    




    return {
        success: "Email Sent"
    }
    
    
}