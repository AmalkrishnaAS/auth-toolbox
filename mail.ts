import { Resend } from "resend";
import {create_template} from "@/email-template";
import {create_template_reset} from "@/email-template";
import { getUserByEmail } from "./data/user";
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
    const existingUser = await getUserByEmail(email)
    const name = existingUser?.name || email.split('@')[0].toLocaleUpperCase()
    const confirmLink =`${process.env.NEXT_PUBLIC_URL}/auth/new-verification?token=${token}`

    resend.emails.send({
        from:process.env.RESEND_FROM_EMAIL as string,
        to: email,
        subject: "Verify your email",
        html: create_template(confirmLink,email,name)
    })
}

export const sendPasswordResetEmail = async (email: string, token: string) => {
    const existingUser = await getUserByEmail(email)
    const name = existingUser?.name || email.split('@')[0].toLocaleUpperCase()
    const resetLink =`${process.env.NEXT_PUBLIC_URL}/auth/new-password?token=${token}`

    resend.emails.send({
        from:process.env.RESEND_FROM_EMAIL as string,
        to: email,
        subject: "Reset your password",
        html: create_template_reset(resetLink,email,name)
    })
}

export const sendTwoFactorEmail = async (email: string, token: string) => {
await resend.emails.send({
    from:process.env.RESEND_FROM_EMAIL as string,
    to: email,
    subject: "Two Factor Authentication",
    html: `Your two factor authentication code is ${token}`
})

}