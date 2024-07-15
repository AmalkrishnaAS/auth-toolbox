"use client"
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import {logout} from '@/actions/logout'


interface LogoutButtonProps {
    children?: React.ReactNode;
    }

const LogoutButton = ({children}:LogoutButtonProps) => {
    const router = useRouter()
    const onClick = async () => {
        await logout()
        router.push('/auth/login')
        
        }
  return (
    <span
    onClick={onClick}
    className='cursor-pointer'
    >
        {children}
    </span>
  )
}

export default LogoutButton