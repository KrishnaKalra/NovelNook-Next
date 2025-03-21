"use client";
import React from "react";
import logo from "../../../public/logo.png";
import Image from "next/image";
import Link from "next/link";
import { Input } from "../ui/input";
import Nav from "./Nav";
import { signOut, useSession } from "next-auth/react";
import { User } from "next-auth";
import { Button } from "../ui/button";
const Header = () => {

  const {data:session,status}=useSession();
    let user:User=session?.user as User;

  return (
    <div className="flex h-[70px] w-[100%] justify-center bg-transparent">
      <div className="container flex w-[100%] justify-between">
        <Link href='/'>
        <div className="flex items-center gap-2 text-black">
          
          <Image src="/logo.png" width="70" height="50" alt="book logo" />
          <p className="font-alegreya-sc m-0 p-0 text-[40px] font-[550]">
            NovelNook
          </p>
          
        </div>
        </Link>
        <div className="mr-5 hidden items-center justify-around gap-10 md:flex">
          {/* <Input
            type="text"
            placeholder="Search A Review"
            className="font-alegreya-sc h-[50px] rounded-none !text-2xl placeholder-[#881249]"
          /> */}
          <Link href="/profile">
            <p className="font-alegreya-sc m-0 p-0 text-3xl/[70px] text-[#881249]">
              Profile
            </p>
          </Link>
          <Link href="/review">
            <p className="font-alegreya-sc m-0 p-0 text-3xl/[70px] text-[#881249]">
              Create
            </p>
          </Link>
          {
            session?(
              <>
                <Button onClick={()=>signOut()} variant="outline">Log Out</Button>
              </>
            ):(
              <Link href="/sign-in">
            <p className="font-alegreya-sc m-0 p-0 text-3xl/[70px] text-[#881249]">
              Sing In
            </p>
          </Link>
            )
          }
        </div>
        <div className="md:hidden">
          <Nav />
        </div>
      </div>
    </div>
  );
};

export default Header;
