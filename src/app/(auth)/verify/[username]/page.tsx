"use client"
import { verifySchema } from '@/validators/veryifySchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation'
import axios, { AxiosError } from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { ApiResponse } from '@/types/ApiResponse';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
const VerifyAccount = () => {
    const router = useRouter();
    const params = useParams<{ username: string }>()
    const form = useForm<z.infer<typeof verifySchema>>({
        resolver: zodResolver(verifySchema),
    })
    const onSubmit = async (data: z.infer<typeof verifySchema>) => {
        try {
            const response = await axios.post(`/api/verify-code`, {
                username: params.username,
                code: data.code
            })
            toast(response.data.message);
            router.replace('/sign-in');
        } catch (error) {
            console.error("Error in signup of user", error);
            const axiosError = error as AxiosError<ApiResponse>;
             toast(`Signup failed ${axiosError.response?.data.message}`);
        }
    }
    return (
        <div className="flex justify-center items-center min-h-screen">
      <div className='w-full max-w-md p-8 space-y-8 bg-white/40 rounded-lg shadow-md'>
        <div className='text-center'>
          <h1 className='text-4xl font-extrabold tracking-tight lg:text-5xl mb-6'>
            Verify Your Account
          </h1>
          <p className='mb-4'>Enter the verification code sent to your email</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification Code</FormLabel>
                  <FormControl>
                    <Input placeholder="code" {...field}/>
                    
                  </FormControl>
                  
                  <FormMessage />
                </FormItem>
              )}
            />
             <Button type='submit'>
              Submit
             </Button>
          </form>
        </Form>
         
      </div>


    </div>
    )
}

export default VerifyAccount