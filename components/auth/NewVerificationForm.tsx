"use client";
import React from 'react'
import CardWrapper from '@/components/auth/CardWrapper' 
import {BeatLoader} from "react-spinners"
import { useSearchParams } from 'next/navigation';
import { useCallback,useLayoutEffect,useState } from 'react';
import {newVerification} from '@/actions/new_verification'
import FormError from '@/components/FormError';
import FormSuccess from '@/components/FormSuccess';
const NewVerificationForm = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const [error,setError] = useState<string | undefined>('')
    const [success,setSuccess] = useState<string | undefined>('')


    const onSubmit = useCallback(async()=>{
        if(!token) {
            setError('Token not found')
            return
        }

        try {
            const data= await newVerification(token)
            setSuccess(data?.success)
            setError(data?.error)
        } catch (error:any) {
            setError(error.message)
        }


    },[token])

    useLayoutEffect(()=>{
        onSubmit()
    },[onSubmit])

  return (
   <CardWrapper
   headerLabel='Verify your email'
   backButtonHref='="/auth/login'
    backButtonLabel='Go back to login'
    >
        <div className="flex w-full justify-center items-center">
            {!success&&!error&&<BeatLoader color='black' />}
            <FormError message={error} />
            <FormSuccess message={success} />
        </div>
        
    </CardWrapper>
  )
}

export default NewVerificationForm