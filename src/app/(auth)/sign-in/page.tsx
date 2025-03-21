"use client"
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod';
import axios, { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react'
import { useDebounceValue,useDebounceCallback } from 'usehooks-ts'
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { signUpSchema } from '@/validators/signUpSchema';
import { ApiResponse } from '@/types/ApiResponse';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { signInSchema } from '@/validators/signInSchema';
import { signIn } from 'next-auth/react';
const Page = () => {
  
  const [isSubmitting, setisSubmitting] = useState(false);

  const router = useRouter();

  //zod implementation

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: '',
      password: ''
    }
  })


  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    const result=await signIn('credentials',{
      redirect:false,
      identifier:data.identifier,
      password:data.password
    })
    if(result?.error){
      toast("Login Failed "+"Incorrect username or password");
    }
    if(result?.url){
      router.replace('/');
    }
  }
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className='w-full max-w-md p-8 space-y-8 bg-white/40 rounded-lg shadow-md'>
        <div className='text-center'>
          <h1 className='text-4xl font-extrabold tracking-tight lg:text-5xl mb-6'>
            Join NovelNook
          </h1>
          <p className='mb-4'>Sign In to start your Adventure</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>

            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email/Username</FormLabel>
                  <FormControl>
                    <Input placeholder="email/username" {...field} />
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
                    <Input type='password' placeholder="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

             <Button type='submit' disabled={isSubmitting}>
              Sign In
             </Button>
          </form>
        </Form>
        <div className='text-center mt-4'>
          <p>
            Already a member?{' '}
            <Link href='/sign-in' className='text-blue-600 hover:text-blue-800'>
            Sign in</Link>
          </p>
        </div>
      </div>


    </div>
  )
}

export default Page;