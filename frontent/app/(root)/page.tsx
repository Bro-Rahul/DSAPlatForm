import React from 'react'
import Image from "next/image"
import { getServerSession } from 'next-auth'
import { SVG } from '@/constants/icons'
import Link from 'next/link'
import options from '../api/auth/[...nextauth]/options'
import LogoutButton from '@/components/auth/LogoutButton'


const HomePage = async () => {
  const session = await getServerSession(options);
  return (
    <div>
      <nav className='flex w-full justify-between items-center px-10 py-4'>
        <Image src={SVG.vercel} alt='icon' width={30} height={30} priority/>
        <ul className='flex justify-between gap-5'>
          <li className='cursor-pointer' ><Link href={'/admin'}>Admin</Link></li>
          <li className='cursor-pointer'><Link href={'/problems'}>General</Link></li>
          {session ? <LogoutButton /> :
            <li className='cursor-pointer'><Link href={'auth/login'}>Auth</Link></li>
          }
        </ul>
      </nav>
    </div>
  )
}

export default HomePage