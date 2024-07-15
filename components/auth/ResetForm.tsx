'use client';
import { LoginSchema } from '@/schema';
import React from 'react'
import { useTransition,useState } from 'react';
import CardWrapper from './CardWrapper'
import {useForm} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ResetSchema } from '@/schema';
import {reset} from '@/actions/reset'
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
import Link from 'next/link';

const ResetForm = () => {
  //const searchParams = useSearchParams()
  //const urlError = searchParams.get('error') === "OAuthAccountNotLinked" ? "Account linked with a different OAuth provider":""

  const [isPending,startTransition] = useTransition()
  const [error,setError] = useState<string | undefined>('')
  const [success,setSuccess] = useState<string | undefined>('')
  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: '',
      
    }
  })

  const onSubmit= async (values:z.infer<typeof ResetSchema>)=>{
    setError('')
    setSuccess('')
    startTransition(async ()=>{

    const data = await reset(values)
    setError(data?.error)
    setSuccess(data?.success)
  }
  )

  console.log(values)
  }


  return (
   <CardWrapper
    headerLabel='Forgot Password?'
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
              Send Recovery Email
            </Button>
          

      </form>
      
    </Form>
   
  </CardWrapper>
  )
}

export default ResetForm