"use client"
import React from 'react'
import Image from 'next/image'
import { Button } from '../ui/button'
import { icons } from '@/constants/icons'
import { signIn } from 'next-auth/react'

const SocialLoginOptions = () => {
    const onClick = (option:"google"|"github")=>{
        const result = signIn(option,{
            redirect : false,
        });
    }
    return (
        <div className='flex w-full mt-2 justify-around gap-5 px-8'>
            <Button onClick={()=>onClick("google")} className='px-3 py-6 text-md font-bold cursor-pointer'>
                <Image src={icons.googleIcon} alt='google icon' width={35} height={35} priority />
                Login with Google
            </Button>
            <Button onClick={()=>onClick("github")} className='px-3 py-6 text-md font-bold cursor-pointer'>
                <Image src={icons.githubIcon} alt='github icon' width={35} height={35} priority />
                Login with Github
            </Button>
        </div>
    )
}

export default SocialLoginOptions