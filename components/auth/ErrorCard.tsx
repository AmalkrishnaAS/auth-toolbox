import React from 'react'
import CardWrapper from '@/components/auth/CardWrapper'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

const ErrorCard = () => {
  return (
   <CardWrapper
   headerLabel='Oops! Something went wrong'
   backButtonHref='/auth/login'
    backButtonLabel='Go back to login'
    >
        <div className="w-full ">
            <ExclamationTriangleIcon className="w-10 h-10 text-red-500 mx-auto" />
        </div>

    </CardWrapper>
  )
}

export default ErrorCard