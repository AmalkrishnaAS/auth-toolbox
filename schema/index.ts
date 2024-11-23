
import { newPassword } from '@/actions/new-password';
import * as z from 'zod';


export const LoginSchema = z.object({
    email: z.string().min(1,{
        message:"Email is Required"
    }).email(),
    password: z.string().min(1,{
        message:"Password is Required"
    }),
    code:z.optional(z.string()),
})
export const RegisterSchema = z.object({
    email: z.string().min(1,{
        message:"Email is Required"
    }).email(),
    password: z.string().min(6,{
        message:"Minimum 6 characters required"
    }),
    name: z.string().min(1,{
        message:"Name is Required"
    })
})

export const ResetSchema = z.object({
    email: z.string().min(1,{
        message:"Email is Required"
    }).email(),
  
})
export const NewPasswordSchema = z.object({
    password: z.string().min(6,{
        message:"Minimum 6 characters required"
    }),
  
})

export const SettingsSchema = z.object({
    isTwoFactorEnabled:z.optional(z.boolean()),
    role:z.optional(z.enum(["ADMIN","USER"])),
    name:z.optional(z.string()),
    email:z.optional(z.string()),
    password:z.optional(z.string().min(6)),
    newPassword:z.optional(z.string().min(6)),
}).refine((data)=>{
    if(data.password && !data.newPassword) return false
    if(!data.password && data.newPassword) return false
    return true
},{
    message:"Password and New Password should not be empty together"
})