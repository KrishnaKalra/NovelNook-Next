"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import ReviewPage from "@/components/ReviewPage/reviewPage";
import { getServerSession, User } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/options";
export default function Home() {
  // let user:User;
  // useEffect(() => {
  //   const func = async () => {
  //     const session = await getServerSession(authOptions)
  //     user = session?.user as User;
  //   }
  //   func();
  //   console.log(user);
  // })
  return (
    <ReviewPage user='' />
  );
}
