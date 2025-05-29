import React from 'react'
import Image from 'next/image'
import { getServerSession } from 'next-auth'
import options from '@/app/api/auth/[...nextauth]/options'
import { icons } from "@/constants/icons"
import { Button } from '../ui/button'


const SubmissionResult = () => {
    return (
        <div className='flex flex-col w-full bg-zinc-800 h-[100%]'>
            <AcceptedResult />
            <RejectionResult />
            <AcceptedCard />
            <RejectedCard />
        </div>
    )
}

const AcceptedCard = async () => {
    const session = await getServerSession(options);
    return (
        <section className='flex flex-col w-full p-2'>
            <div className='flex items-center bg-[rgba(74,222,128,0.3)] rounded-xl px-4 py-1 text-white cursor-pointer'>
                <p>Accepted 45/45<br />11th May,2025</p>
            </div>
        </section>
    )
}

const RejectedCard = async () => {
    const session = await getServerSession(options);
    return (
        <section className='flex flex-col w-full p-2'>
            <div className='flex items-center bg-[rgba(244,63,94,0.3)] rounded-xl px-4 py-1 text-white cursor-pointer'>
                <p>Rejected 18/45<br />11th May,2025</p>
            </div>
        </section>
    )
}

const RejectionResult = () => {
    return (
        <div className='flex flex-col w-full px-25 gap-5'>
            <div className='flex justify-between items-center gap-5'>
                <div>
                    <p className='font-bold text-2xl text-[rgba(244,63,94,.9)]'>Wrong Answer <span className='text-sm font-bold text-gray-500 '>64/65 testcases passed</span></p>
                    <span>submitted at May 03,2025 20:25</span>
                </div>
                <Button className='bg-zinc-700 cursor-pointer text-white hover:bg-zinc-600'>
                    <Image src={icons.editorailIcon} alt='editorail' width={20} height={20} />
                    Editorial
                </Button>
            </div>
            <div className='flex flex-col gap-2'>
                <p className='font-normal text-zinc-400'>Input</p>
                <div className='flex w-full bg-zinc-700/55 py-3 px-5 rounded-xl'>
                    nums=<br />[1,2,3,4,5,6]
                </div>
                <div className='flex w-full bg-zinc-700/55 py-3 px-5 rounded-xl'>
                    target=<br />0
                </div>
                <p className='font-normal text-zinc-400'>Output</p>
                <div className='flex w-full bg-zinc-700/55 py-3 px-5 rounded-xl'>
                    [1,2,3,4,5,6]
                </div>
                <p className='font-normal text-zinc-400'>Expected</p>
                <div className='flex w-full bg-zinc-700/55 py-3 px-5 rounded-xl'>
                    [1,2,3,4,5,6]
                </div>
            </div>
            <div>
                <p className='font-normal text-zinc-400'>Code : Java</p>
                <p>code here with monaco editor </p>
            </div>
        </div>
    )
}

const AcceptedResult = async () => {
    const session = await getServerSession(options);
    return (
        <div className='flex flex-col w-full px-25 gap-5'>
            <div className='flex justify-between items-center gap-5'>
                <div>
                    <p className='font-normal text-xl text-[rgba(22,163,74,1)]'>Accepted <span className='text-sm font-bold text-gray-500 '>64/65 testcases passed</span></p>
                    <div className='flex justify-center items-center gap-2'>
                        <Image 
                            src={session?.user.image || icons.dummyProfileIcon} 
                            alt='profile icon' 
                            width={25} 
                            height={25} 
                            className='rounded-full'    
                        />
                        <span className='text-sm font-light'>Rahul Yadav submitted at May 03,2025 20:25</span>
                    </div>
                </div>
                <Button className='bg-zinc-700 cursor-pointer text-white hover:bg-zinc-600'>
                    <Image src={icons.editorailIcon} alt='editorail' width={20} height={20} />
                    Solution
                </Button>
            </div>
            <div>
                <p className='font-normal text-zinc-400'>Code : Java</p>
                <p>code here with monaco editor </p>
            </div>
        </div>
    )
}

export default SubmissionResult