
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
    name:z.optional(z.string()),
})