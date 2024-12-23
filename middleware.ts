import authConfig from './auth.config'
import NextAuth from 'next-auth'
import {
    DEFAULT_LOGIN_REDIRECT,
    authRoutes,
    publicRoutes,
    apiRoutePrefix
    
} from '@/routes'


const {auth} =NextAuth(authConfig)

export default auth((req)=>{
    const {nextUrl} =req
    const isLoggedIn = !!req.auth

    const isApiAuthRoute =nextUrl.pathname.startsWith(apiRoutePrefix)
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
    const isAuthRoute = authRoutes.includes(nextUrl.pathname)

   if(isApiAuthRoute) return null;

   if(isAuthRoute) {
    if(isLoggedIn) {
        return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT,nextUrl.origin))
    }
    return null
   }

   if(!isPublicRoute && !isLoggedIn) {
       return Response.redirect(new URL('/auth/login',nextUrl.origin))
    }
    return null


    
    

})

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}