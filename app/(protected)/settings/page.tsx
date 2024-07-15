"use client"
import React from 'react'
import {auth} from '@/auth'
import { useRouter } from 'next/navigation'
import { logout } from '@/actions/logout'
import { settings } from '@/actions/settings'
import { useCurrentUser } from '@/hooks/use-current-user'
import { useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useSession } from 'next-auth/react'
const page =  () => {
  const  user = useCurrentUser()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const {update} = useSession()

  
    
    const onClick = async () => {
     
      startTransition(async () => {
        await settings({
          name: 'new name'
        })
        await update()
      })
    
    
    }
  return (
    <Card className='w-[600px]'>
      <CardHeader>
        <p className='text-2xl font-semibold text-center'>
          Settings
        </p>
      </CardHeader>
      <CardContent>
        <Button
        onClick={onClick}
        disabled={isPending}
        >
          Update Name 
        </Button>
      </CardContent>
      </Card>
  )
}

    
  

export default page