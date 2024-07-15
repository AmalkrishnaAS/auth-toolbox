'use server'
import {signOut} from '@/auth'
import {redirect} from 'next/navigation'

export const logout = async () => {
    await signOut()
    //return redirect('/auth/login')
    
}

export default logout