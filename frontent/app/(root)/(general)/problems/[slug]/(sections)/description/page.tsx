import MdxDescription from '@/components/solve/MdxDescription';
import ProblemMetaDetails from '@/components/solve/ProblemMetaDetails';
import { Badge } from '@/components/ui/badge';
import { getProblemDescription } from '@/http/general/problemHttp';
import React from 'react'

const DescriptionPage:React.FC<{
  params:Promise<{slug:string}>
}> = async ({params}) => {
  const {slug} = await params;
  const problem = await getProblemDescription(slug);

  return (
    <div className='flex flex-col w-full h-[100vh] px-5 gap-8 bg-zinc-800 overflow-y-scroll custom-scrollbar'>
      <div className='flex justify-between w-full'>
        <h1 className='text-3xl font-bold'>{problem.id}.{problem.title}</h1>
        <Badge className={problem.difficulty.toLowerCase()}>{problem.difficulty}</Badge>
      </div>
      <MdxDescription
        mdxString={problem.description}
      />
      <ProblemMetaDetails
        hints={problem.hints.split("\n")}
        tags={problem.tags}
        problemId={problem.id}
      />
    </div>
  )
}

export default DescriptionPage