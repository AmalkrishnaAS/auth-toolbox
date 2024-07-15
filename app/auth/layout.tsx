import React from 'react'

const AuthLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <div
    className='flex flex-col h-full justify-center items-center bg-gradient-to-br from-sky-500 via-teal-500 to-blue-500'
    >
        {children}
    </div>
  )
}

export default AuthLayout