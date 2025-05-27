import { getProblem } from '@/http/general/problemHttp'
import React from 'react'
import ProblemAbouts from '@/components/solve/ProblemAbouts'
import SandBox from '@/components/solve/SandBox'
import { decodeTestCases } from '@/lib/utils'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


const SolveProblem: React.FC<{
  params: Promise<{ slug: string }>
}> = async ({ params }) => {
  const { slug } = await params
  const problem = await getProblem(slug);
  const { formatedTestCase } = decodeTestCases(problem.testcases);
  return (
    <div className='grid grid-cols-2 w-full h-[100vh]'>
      <Tabs defaultValue="description" className='overflow-y-scroll custom-scrollbar w-full'>
        <TabsList className='w-fit py-2 h-fit flex gap-5 cursor-pointer'>
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="Submissions">Submissions</TabsTrigger>
          <TabsTrigger value="Solutions">Solutions</TabsTrigger>
        </TabsList>
        <TabsContent value="description">
          <ProblemAbouts problem={problem} />
        </TabsContent>
        <TabsContent value="Submissions">
          Change your password here.
        </TabsContent>
        <TabsContent value="Solutions">
          Change your password here.
        </TabsContent>
      </Tabs>
      <SandBox
        starterCodes={problem.starter_codes}
        testcases={formatedTestCase}
        slug={slug}
      />
    </div>
  )
}

export default SolveProblem