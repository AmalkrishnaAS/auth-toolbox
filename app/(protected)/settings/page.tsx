"use client"
import React from 'react'
import { useState } from 'react'
import {auth} from '@/auth'
import { useRouter } from 'next/navigation'
import { logout } from '@/actions/logout'
import { settings } from '@/actions/settings'
import { useCurrentUser } from '@/hooks/use-current-user'
import { useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Form,
  FormField,
  FormLabel,
  FormControl,
  FormItem,
  FormMessage,
  FormDescription

} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useSession } from 'next-auth/react'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { SettingsSchema } from '@/schema'
import { useForm } from 'react-hook-form'
import FormSuccess from '@/components/FormSuccess'
import FormError from '@/components/FormError'
import { Select,SelectContent,SelectItem,SelectTrigger,SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { UserRoles } from '@prisma/client'
const page =  () => {
  const  user = useCurrentUser()

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: user?.name || undefined,
      email: user?.email || undefined,
      password: undefined,
      newPassword: undefined,
      role: user?.role || undefined,
      isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined
      
    }
  })
  const [error,setError] = useState<string | undefined>()
  const [success,setSuccess] = useState<string | undefined>()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const {update} = useSession()

  
    
    const onSubmit= async (values:z.infer<typeof SettingsSchema>)=>{
      startTransition(async () => {
        try {
          setError(undefined);
          setSuccess(undefined);
          
          const result = await settings(values);
          
          if (result?.error) {
            setError(result.error);
          } else {
            await update();
            setSuccess("Settings updated successfully!");
          }
        } catch (error) {
          setError("Something went wrong!");
        }
      });
    }
  return (
    <Card className='w-[600px]'>
      <CardHeader>
        <p className='text-2xl font-semibold text-center'>
          Settings
        </p>
      </CardHeader>
      <CardContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field}
                  disabled= {isPending}
                  
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="john.doe@example.com" {...field}
                  disabled= {isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="*******" {...field}
                  disabled= {isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input placeholder="*******" {...field}
                  disabled= {isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            //role
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled= {isPending}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={UserRoles.ADMIN}>ADMIN</SelectItem>
                    <SelectItem value={UserRoles.USER}>USER</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isTwoFactorEnabled"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">
                    Two-factor authentication
                  </FormLabel>
                  <FormDescription className="text-sm text-muted-foreground">
                    Add an extra layer of security to your account
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={isPending}
                    className="data-[state=checked]:bg-primary"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          </div>
          <FormSuccess message={success} />
          <FormError message={error} />
          <Button type="submit" disabled={isPending}>Save</Button>
        </form>
      </Form>
      
      </CardContent>
      </Card>
  )
}

    
  

export default page