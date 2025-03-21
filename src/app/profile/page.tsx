"use client"
import { useSession } from 'next-auth/react'
import ReviewPage from '@/components/MyReviewPage/myReviewPage'
import React, { useEffect, useState } from 'react'
import { User } from 'next-auth'
const profile = () => {

  return (
    <ReviewPage/>
  )
}

export default profile