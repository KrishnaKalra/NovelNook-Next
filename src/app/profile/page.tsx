"use client"
import ReviewPage from '@/components/ReviewPage/reviewPage'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { User } from 'next-auth'
const profile = () => {
  const {data:session}=useSession();
  const [userId,setUserId]=useState('');
  let user:User=session?.user as User;
  useEffect(()=>{
    if(session?.user)
    setUserId(user._id)
    console.log(userId);
 
  },[])
  return (
    <ReviewPage user={userId}/>
  )
}

export default profile