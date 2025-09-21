import options from '@/app/api/auth/[...nextauth]/options';
import AcceptedCard from '@/components/solve/AcceptedCard';
import RejectedCard from '@/components/solve/RejectCard';
import { getUserSubmissions } from '@/http/general/submissionHttp';
import { getServerSession } from 'next-auth';
import React from 'react'

const SubmissionsPage:React.FC<{
  params : Promise<{slug:string}>
}> = async ({params}) => {
  const {slug} = await params;
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
    <ol className='w-full bg-zinc-800 h-full space-y-2 overflow-y-scroll custom-scrollbar'>
      {content}
    </ol>
  )
}

export default SubmissionsPage