"use client"

import React from 'react'
import MyForm from '@/components/Form/form'
import Image from 'next/image'
import { useParams } from 'next/navigation'
const review = () => {
    const params = useParams<{ reviewId: string }>()
  return (
    <div className='h-[100vh] w-[100vw] flex justify-around items-center'>
      <div className='bg-white   rounded-2xl h-[70%] w-[300px] xs:w-[375px] flex items-center justify-center border-2 border-gray-200 shadow-2xl'>

      
      <MyForm reviewId={params.reviewId}/>
      
      </div>
      <Image src='/book.png' alt='book' height={900} width={600} className='hidden md:flex h-[500px] w-[500px] md:h-[600px] md:w-[600px]' />
    </div>
  )
}

export default review