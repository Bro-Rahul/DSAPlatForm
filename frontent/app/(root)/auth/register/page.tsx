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
import RegisterFields from "@/components/auth/RegisterFields"
import { getServerSession } from "next-auth"
import options from "@/app/api/auth/[...nextauth]/options"
import { redirect } from "next/navigation"

const RegisterPage = async () => {
  const session = await getServerSession(options);
  if(session){
    redirect('/')
  }
  return (
    <div className='flex w-full h-screen justify-center items-center'>
      <Card className='w-[510px] flex justify-center text-center'>
        <CardHeader>
          <CardTitle className='text-2xl'>Register</CardTitle>
          <CardDescription>Create a New Account</CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterFields/>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p>Already have an Account? <Link href={'/auth/login'} className="font-bold hover:underline hover:text-blue-500">Login</Link></p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default RegisterPage