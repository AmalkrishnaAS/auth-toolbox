"use client"
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuContent,
    DropdownMenuTrigger

} from  '@/components/ui/dropdown-menu'
import { FaUser,FaDoorOpen } from 'react-icons/fa6'
import { useCurrentUser } from '@/hooks/use-current-user'
import LogoutButton from './LogoutButton'
import { ExitIcon } from '@radix-ui/react-icons'
import {
    Avatar,
    AvatarImage,
    AvatarFallback

} from '@/components/ui/avatar'

const UserButton = () => {
    const user = useCurrentUser()
   return (
    <DropdownMenu>
        <DropdownMenuTrigger>
            <Avatar>
                <AvatarImage 
                src={user?.image || ""}
                alt={user?.name || ""}
                />
                <AvatarFallback
                className='bg-gradient-to-br from-sky-500  to-blue-700'
                >
                    <FaUser
                    className='text-white'
                    />
                </AvatarFallback>

            </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent
        className='w-40' align='end'
        >
            <LogoutButton>
                <DropdownMenuItem>
                    <ExitIcon className='mr-2 w-4 h-4'/>
                    Logout
                </DropdownMenuItem>
            </LogoutButton>
            </DropdownMenuContent>
    </DropdownMenu>
   )
}

export default UserButton



