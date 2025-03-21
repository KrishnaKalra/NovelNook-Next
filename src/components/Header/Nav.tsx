"use client"
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { CiMenuFries } from 'react-icons/ci'
import { signOut, useSession } from 'next-auth/react'
import { User } from 'next-auth'

const links = [
    {
        name: 'Home',
        path: '/'
    },
    {
        name: 'Create a Review',
        path: '/review'
    },
    {
        name: 'Profile',
        path: '/profile'
    },
]
const Nav = () => {
    const { data: session, status } = useSession();
    let user: User = session?.user as User;
    const pathname = usePathname();
    return (
        <Sheet>
            <SheetTrigger className='flex justify-center items-center'>
                <CiMenuFries color="black" stroke='black' strokeWidth={2} className='text-[32px] m-5 text-accent' />
            </SheetTrigger>
            <SheetContent className='flex flex-col  '>
                <div className='mt-7 mb-10 text-center font-alegreya-sc text-3xl text-white'>
                    <Link href='/'>
                        NovelNook<span>.</span>
                    </Link>
                </div>
                <nav className='flex flex-col justify-center  ml-10 gap-10'>
                    {
                        links.map((link, index) => {
                            return (
                                <p><Link href={link.path} key={index} className={`${link.path === pathname && "text-white font-bold border-b-2 !border-accent"} text-2xl captalize  text-white hover:text-accent font-encode-sans-semi-condensed transition-all`}>{link.name}</Link></p>
                            )
                        }
                        )
                    }
                    {
                        session ? (
                            <>
                                <p onClick={()=>(signOut())}className={` text-2xl captalize  text-white hover:text-accent font-encode-sans-semi-condensed transition-all`}>Log Out</p>
                            </>
                        ) : (
                            <Link href="/sign-in">
                                <p className={` text-2xl captalize  text-white hover:text-accent font-encode-sans-semi-condensed transition-all`}>Sign In</p>
                            </Link>
                        )
                    }
                </nav>
            </SheetContent>
        </Sheet>
    )
}

export default Nav