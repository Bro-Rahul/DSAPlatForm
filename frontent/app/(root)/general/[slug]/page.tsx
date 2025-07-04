import { getProblem } from '@/http/general/problemHttp'
import React from 'react'
import SandBox from '@/components/solve/SandBox'
import { decodeTestCases } from '@/lib/utils'
import ProblemTabs from '@/components/solve/ProblemTabs'
import Link from 'next/link'


const SolveProblem: React.FC<{
  params: Promise<{ slug: string }>
}> = async ({ params }) => {
  const { slug } = await params

  return (
    <div className='flex flex-row justify-between items-center w-full h-fit p-2 bg-black'>
      <div>
        <Link href={`${slug}/submissions`}>Submissions</Link>
      </div>
      <div>
        <p>Problem List</p>
      </div>
      <div>
        <p>Problem List</p>
      </div>
    </div>
  )
}

export default SolveProblem