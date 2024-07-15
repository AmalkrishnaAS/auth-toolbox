'use client';
import { LoginSchema } from '@/schema';
import React from 'react'
import { useTransition,useState } from 'react';
import CardWrapper from './CardWrapper'
import {useForm} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { NewPasswordSchema } from '@/schema';
import {reset} from '@/actions/reset'
import { useSearchParams } from 'next/navigation';
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

import {newPassword} from '@/actions/new-password'
import Link from 'next/link';

const NewPasswordForm = () => {
  const searchParams = useSearchParams()
  //const urlError = searchParams.get('error') === "OAuthAccountNotLinked" ? "Account linked with a different OAuth provider":""
  const token = searchParams.get('token')

  const [isPending,startTransition] = useTransition()
  const [error,setError] = useState<string | undefined>('')
  const [success,setSuccess] = useState<string | undefined>('')
  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: '',
      
    }
  })

  const onSubmit= async (values:z.infer<typeof NewPasswordSchema>)=>{
    setError('')
    setSuccess('')
    startTransition(async ()=>{
    const data = await newPassword(values,token)
    setError(data?.error)
    setSuccess(data?.success)
    }
    )
  }


  return (
   <CardWrapper
    headerLabel='Update Password'
    backButtonLabel="Back to login"
    backButtonHref='/auth/login'
    showSocial={false}
  >
    <Form
    {...form}
    >
      <form onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-6'
        >
          <div className="space-y-4">
            <FormField
            control={form.control}
            name='password'
            render={({field}) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input
                  {...field}
                  disabled={isPending}
                  type='password'
                  placeholder='********'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />
            
            </div>
            <FormError
            message={error}
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
              Update Password
            </Button>
          

      </form>
      
    </Form>
   
  </CardWrapper>
  )
}

export default NewPasswordForm