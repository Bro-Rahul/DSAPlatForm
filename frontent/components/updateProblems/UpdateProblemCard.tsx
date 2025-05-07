'use client'
import { UpdateProblemType } from '@/types/store'
import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import UpdateCodeEditor from '../editor/UpdateCodeEditor'
import useUpdateProblem from '@/store/useUpdateProblem'
import dynamic from 'next/dynamic'
import UpdateTestCase from './UpdateTestCase'

const UpdateGeneralFields = dynamic(() => import("@/components/updateProblems/UpdateGeneralFields"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
})

const UpdateProblemCard: React.FC<{
  problem: UpdateProblemType,
  slug: string
}> = ({ problem, slug }) => {
  const { setProblem } = useUpdateProblem();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const localData = localStorage.getItem("updateProblems") ? JSON.parse(localStorage.getItem("updateProblems")!) : {};
      if (localData?.state?.problems?.[slug]) {
        setProblem(slug, {
          ...problem,
          ...localData['state']['problems'][slug]
        })
      } else {
        setProblem(slug, {
          ...problem,
        })
      }
    }
  }, [slug, problem]);

  return (
    <Tabs defaultValue="general" className="flex flex-col w-full">
      <TabsList className="flex w-full">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="starter">Starter Codes</TabsTrigger>
        <TabsTrigger value="solution">Solution Codes</TabsTrigger>
        <TabsTrigger value="testcase">Test cases</TabsTrigger>
      </TabsList>
      <TabsContent value="general">
        <UpdateGeneralFields
          slug={slug}
        />
      </TabsContent>
      <TabsContent 
        value="starter">
        <UpdateCodeEditor
          codeType='starter_codes'
          slug={slug}
          codes={problem.starter_codes}
        />
      </TabsContent>
      <TabsContent value="solution">
        <UpdateCodeEditor
          codes={problem.solution_codes}
          codeType='solution_codes'
          slug={slug}
        />
      </TabsContent>
      <TabsContent value="testcase">
        <UpdateTestCase problem={problem}/>
      </TabsContent>
    </Tabs>
  )
}

export default UpdateProblemCard