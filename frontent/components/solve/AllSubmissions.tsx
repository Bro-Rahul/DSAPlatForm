
import options from '@/app/api/auth/[...nextauth]/options'
import { getUserSubmissions } from '@/http/general/problemHttp'
import { getServerSession } from 'next-auth'
import React from 'react'
import AcceptedCard from './AcceptedCard'
import RejectedCard from './RejectCard'

const AllSubmissions: React.FC<{
    slug: string
}> = async ({ slug }) => {
    const session = await getServerSession(options)
    if (!session) {
        return <p>Login first</p>
    }
    const response = await getUserSubmissions(slug, session.user.access);
    let content;

    content = response.length === 0 ? <p className="text-center pt-5 capitalize">Please submit atleast one Solution!</p> : response?.map((history, index) => (
        history.status === "accepted" ? <AcceptedCard result={history} key={index} /> : <RejectedCard result={history} key={index} />
    ))

    return (
        <ol className='w-full bg-zinc-800 h-full space-y-2'>
            {content}
        </ol>

    )
}

export default AllSubmissions