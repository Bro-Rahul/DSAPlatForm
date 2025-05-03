import LoginFields from "@/components/auth/loginFields"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import React from 'react'
import Link from "next/link"
import SocialLoginOptions from "@/components/auth/SocialLoginOptions"
import { getServerSession } from "next-auth"
import options from "@/app/api/auth/[...nextauth]/options"
import { redirect } from "next/navigation"

const LoginPage = async() => {
  const session = await getServerSession(options);
  if(session){
    redirect('/');
  }
  return (
    <div className='flex w-full h-screen justify-center items-center'>
      <Card className='w-[510px] flex justify-center text-center'>
        <CardHeader>
          <CardTitle className='text-2xl'>Login</CardTitle>
          <CardDescription>Login to keep track your progress</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginFields/>
          <SocialLoginOptions/>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p>Don't have an Account? <Link href={'/auth/register'} className="font-bold hover:underline hover:text-blue-500">Register</Link></p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default LoginPage