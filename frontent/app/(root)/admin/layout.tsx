import { SVG } from '@/constants/icons'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const AdminLayout: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <div className='flex flex-col w-full p-2'>
      <nav className='flex w-full justify-between items-center px-10 py-4'>
        <Image src={SVG.vercel} alt='icon' width={50} height={50} />
        <ul className='flex justify-between gap-5'>
          <li className='cursor-pointer' ><Link href={'/admin/setproblem'}>SetProblem</Link></li>
          <li className='cursor-pointer'><Link href={'/admin/updateproblems'}>Update Problem</Link></li>
        </ul>
      </nav>
      {children}
    </div>
  )
}

export default AdminLayout