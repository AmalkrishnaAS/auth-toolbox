import NextAuth from "next-auth"
import authConfig from "@/auth.config"
import { PrismaAdapter} from "@auth/prisma-adapter"
import {db} from "@/lib/db"
import { getUserById } from "@/data/user"
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation"


export const { handlers:{GET,POST}, auth,signIn,signOut } = NextAuth({
    pages:{
        signIn:'/auth/login',
        error:'/auth/error',
    },
    adapter: PrismaAdapter(db) as any,
    callbacks:{

        async signIn({user,account,profile}) {
            if(account?.provider!=="credentials") return true


            const existingUser = await getUserById(user.id)
            if(!existingUser) return false
            if(!existingUser.emailVerified) return false
            if(existingUser.isTwoFactorEnabled) {
                const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(user.id)
                if(!twoFactorConfirmation) return false
                //Delete the two factor confirmation for next time
                await db.twoFactorConfirmation.delete({
                    where:{
                        id:twoFactorConfirmation.id
                    }
                })
            }
            return true
        },
        
       
        async jwt({token}) {
            if(!token.sub) return token
            const existingUser = await getUserById(token.sub)
            if(!existingUser) return token
            token.role = existingUser.role
            token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled
            token.name = existingUser.name
            token.email = existingUser.email

            

            return token
        },
        async session({token,session}) {
           
            if(session.user && token.sub)
            session.user.id = token.sub

            if(session.user && token.role)
            session.user.role = token.role as "ADMIN" | "USER"
            if(session.user && token.isTwoFactorEnabled)
            session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean
            if(session.user) {
                session.user.name = token.name
                session.user.email = token.email as string

            }
            return session
        }

    },
    events: {
        async linkAccount({user}) {
            await db.user.update({
                where:{
                    id:user.id
                },
                data:{
                    emailVerified:new Date()
                }
            })
        }

    },
    session:{strategy:'jwt'},
    ...authConfig
  
})