'use client';
import { LoginSchema } from '@/schema';
import React from 'react'
import { useTransition,useState } from 'react';
import CardWrapper from './CardWrapper'
import {useForm} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormField,
  FormLabel,
  FormControl,
  FormItem,
  FormMessage

} from '@/components/ui/form'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button'
import * as z from 'zod'
import FormError from '@/components/FormError';
import FormSuccess from '../FormSuccess';

import {login} from '@/actions/login'

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  const searchParams = useSearchParams()
  const urlError = searchParams.get('error') === "OAuthAccountNotLinked" ? "Account linked with a different OAuth provider":""

  const [isPending,startTransition] = useTransition()
  const [showTwoFactor,setShowTwoFactor] = useState(false)
  const [error,setError] = useState<string | undefined>('')
  const router = useRouter()
  const [success,setSuccess] = useState<string | undefined>('')
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit= async (values:z.infer<typeof LoginSchema>)=>{
    setError('')
    setSuccess('')
    startTransition(async ()=>{

      try {

    const data = await login(values)
    if(data?.error) {
      form.reset()
      setError(data?.error)

    }
    if(data?.success) {
      form.reset()
      //router.push('/settings')
      setSuccess(data?.success)
    }
    if(data?.twoFactor) {
      setShowTwoFactor(true)
      
    }

      } catch (error) {
        setError('An error occurred')
      }
  }
  )
  }


  return (
   <CardWrapper
    headerLabel='Login'
    backButtonLabel="Don't have an account?"
    backButtonHref='/auth/register'
    showSocial={true}
  >
    <Form
    {...form}
    >
      <form onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-6'
        >
          <div className="space-y-4">
            { !showTwoFactor &&
              <>
              <FormField
            control={form.control}
            name='email'
            render={({field}) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                  {...field}
                  disabled={isPending}
                  type='email'
                  placeholder='john.doe@gmail.com'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name='password'
            render={({field}) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                  {...field}
                  disabled={isPending}
                  type='password'
                  placeholder='password@123'
                  />
                </FormControl>
                <Button
                variant= 'link'
                className='text-sm px-0 font-normal'
                size={'sm'}
                asChild
                >
                  <Link href='/auth/reset'>
                    Forgot Password?
                  </Link>
                </Button>
                <FormMessage />
              </FormItem>
            )}
            />
            </>
          }

          { showTwoFactor &&
            <FormField
            control={form.control}
            name='code'
            render={({field}) => (
              <FormItem>
                <FormLabel>Two Factor Code</FormLabel>
                <FormControl>
                  <Input
                  {...field}
                  disabled={isPending}
                  type='text'
                  placeholder='123456'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />
          }
            </div>
            <FormError
            message={error || urlError}
            />
            <FormSuccess
            message={success}
            />
            <Button
            disabled={isPending}
            type='submit'
            size='lg'
            className='w-full'
            >
              {showTwoFactor ? 'Verify':'Login'}
            </Button>
          

      </form>
      
    </Form>
   
  </CardWrapper>
  )
}

export default LoginForm