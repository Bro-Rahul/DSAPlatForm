import React from 'react'
import Image from 'next/image'
import { getServerSession } from 'next-auth'
import options from '@/app/api/auth/[...nextauth]/options'
import { redirect } from 'next/navigation'

const AdminHomePage = async() => {
  const session = await getServerSession(options);
  let user;
  if(!session){
    redirect("/auth/login");
  }
  return (
    <div>
      AdminHomePage {JSON.stringify(session)}
      {session.user?.image && <Image src={session.user.image} width={100} height={100} alt='profile'/>}
    </div>
  )
}

export default AdminHomePage