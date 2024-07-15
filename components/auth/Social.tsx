import React from 'react'
import  {FcGoogle} from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa6'
import { Button } from '@/components/ui/button'

import { signIn } from 'next-auth/react'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'

const Social = () => {


  const onClick = (provider: 'google' | 'github') => {
    signIn(provider,{
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    })
    

  }
  return (
    <div
    className='w-full flex gap-x-2 items-center'
    >
        <Button
        variant='outline'
        size='lg'
        className='w-full'
        onClick={() => onClick('google')}
        >
            <FcGoogle
            className='w-5 h-5'
            />
        </Button>
        <Button
        variant='outline'
        size='lg'
        className='w-full'
        onClick={() => onClick('github')}
        >
            <FaGithub
            className='w-5 h-5'
            />
        </Button>

    </div>
  )
}

export default Social