import { getProblem } from '@/http/general/problemHttp'
import React from 'react'
import SandBox from '@/components/solve/SandBox'
import { decodeTestCases } from '@/lib/utils'
import ProblemTabs from '@/components/solve/ProblemTabs'


const SolveProblem: React.FC<{
  params: Promise<{ slug: string }>
}> = async ({ params }) => {
  const { slug } = await params
  const problem = await getProblem(slug);
  const { formatedTestCase } = decodeTestCases(problem.testcases);
  return (
    <div className='grid grid-cols-2 w-full h-[100vh]'>
      <ProblemTabs problem={problem}/>
      <SandBox
        starterCodes={problem.starter_codes}
        testcases={formatedTestCase}
        slug={slug}
      />
    </div>
  )
}

export default SolveProblem