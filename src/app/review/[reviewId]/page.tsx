"use client"

import React from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import MyForm from '@/components/Form/form'
import Image from 'next/image'
import { useParams } from 'next/navigation'
const review = () => {
    const params = useParams<{ reviewId: string }>()
  return (
    <div className='h-[100vh] w-[100vw] flex justify-around items-center'>
      <div className='bg-white rounded-2xl h-[70%] w-[375px] flex items-center justify-center border-2 border-gray-200 shadow-2xl'>
      {/* <form className='flex flex-col w-[90%] h-[88%] gap-4'>
        <Input type='text' placeholder='ISBN'/>
        <Input type='text' placeholder='Title of Book'/>
        <Input type='text' placeholder='Author'/>
        <Textarea  placeholder='Review' className='resize-none h-[60%]'/>
        <Button className='!shadow-2xl'>Post</Button>
      </form> */}
      
      <MyForm reviewId={params.reviewId}/>
      
      </div>
      <Image src='/book.png' alt='book' height={900} width={600} className='hidden md:flex h-[500px] w-[500px] md:h-[600px] md:w-[600px]' />
    </div>
  )
}

export default review