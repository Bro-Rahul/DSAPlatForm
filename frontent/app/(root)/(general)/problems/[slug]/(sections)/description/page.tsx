import MdxDescription from '@/components/solve/MdxDescription';
import ProblemMetaDetails from '@/components/solve/ProblemMetaDetails';
import { Badge } from '@/components/ui/badge';
import { getProblemDescription } from '@/http/general/problemHttp';
import { formatNumber } from '@/util';
import React from 'react'

const DescriptionPage: React.FC<{
  params: Promise<{ slug: string }>
}> = async ({ params }) => {
  const { slug } = await params;
  const problem = await getProblemDescription(slug);
  let actualPercentage = 'N/A';

  if (problem.total_submissions > 0) {
    const [percentage, decimalVal] = formatNumber(
      (problem.total_accepted / problem.total_submissions) * 100
    ).split('.');
    actualPercentage = `${percentage}.${(decimalVal || '00').slice(0, 2)}`;
  }
  return (
    <div className='flex flex-col w-full h-[100vh] px-5 gap-8 bg-zinc-800 overflow-y-scroll custom-scrollbar'>
      <div className='flex justify-between w-full'>
        <h1 className='text-3xl font-bold'>{problem.id}.{problem.title}</h1>
        <Badge className={problem.difficulty.toLowerCase()}>{problem.difficulty}</Badge>
      </div>
      <MdxDescription
        mdxString={problem.description}
      />
      <div className='flex w-full items-center gap-5'>
        <p className='text-xl'>
          Accepted <span className='font-semibold text-2xl'>{formatNumber(problem.total_accepted)}</span> /
          <span className='font-semibold text-sm'>{formatNumber(problem.total_submissions)}</span>
        </p>
        <p className='text-xl'>
          Accepted Rate <span className='font-semibold text-md'>{actualPercentage}%</span>
        </p>
      </div>

      <ProblemMetaDetails
        totalComments={problem.comments_total}
        hints={problem.hints.split("\n")}
        tags={problem.tags}
        problemId={problem.id}
      />
    </div>
  )
}

export default DescriptionPage