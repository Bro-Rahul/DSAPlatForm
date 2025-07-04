import { getProblem } from '@/http/general/problemHttp'
import React from 'react'
import ProblemTabs from '@/components/solve/ProblemTabs'


const ProblemDetailsPage: React.FC<{
  params: Promise<{ slug: string }>
}> = async ({ params }) => {
  const { slug } = await params
  const problem = await getProblem(slug);
  return (
    <div className='grid grid-cols-1 w-full h-full pb-4'>
      <ProblemTabs problem={problem} />
    </div>
  )
}

export default ProblemDetailsPage