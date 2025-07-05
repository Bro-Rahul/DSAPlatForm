import ProblemAbouts from '@/components/solve/ProblemDescription';
import { getProblem } from '@/http/general/problemHttp';
import React from 'react'

const ProblemDescriptionPage: React.FC<{
  params: Promise<{ slug: string }>
}> = async ({ params }) => {
  const { slug } = await params
  const problem = await getProblem(slug);
  return (
    <div className='grid grid-cols-1 w-full h-full pb-4'>
      <ProblemAbouts slug={slug} />
    </div>
  )
}

export default ProblemDescriptionPage