'use client';
import { RegisterSchema } from '@/schema';
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

import {register} from '@/actions/register'

const RegisterForm = () => {
  const [isPending,startTransition] = useTransition()
  const [error,setError] = useState<string | undefined>('')
  const [success,setSuccess] = useState<string | undefined>('')
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
    }
  })

  const onSubmit= async (values:z.infer<typeof RegisterSchema>)=>{
    setError('')
    setSuccess('')
    startTransition(async ()=>{
      const data= await register(values)
      setError(data.error)
      setSuccess(data.success)
    })
  }


  return (
   <CardWrapper
    headerLabel='Create an account'
    backButtonLabel="Already have an account?"
    backButtonHref='/auth/login'
    showSocial={true}
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
            name='name'
            render={({field}) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                  {...field}
                  disabled={isPending}
                  type='text'
                  placeholder='John Doe'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />
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
              Create an Account
            </Button>
          

      </form>
      
    </Form>
   
  </CardWrapper>
  )
}

export default RegisterForm