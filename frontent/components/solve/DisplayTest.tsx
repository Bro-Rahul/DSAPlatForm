'use client'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import useSandBox from '@/store/useSandBox'
import TestCase from './TestCase'
import Image from 'next/image'
import { icons } from '@/constants/icons'


const DisplayTest: React.FC<{
  slug: string
}> = ({ slug }) => {
  const { config, resetTestCase } = useSandBox();
  return (
    <div className='flex flex-col w-full h-1/2 px-1 bg-zinc-800 relative'>
      <Tabs defaultValue="testcase">
        <TabsList className='border-b-2 items-start justify-start flex gap-4'>
          <TabsTrigger
            className='px-8'
            value="testcase">
            <Image
              src={icons.terminalIcons}
              alt='result'
              width={20}
              height={20}
            />
            Test Case
          </TabsTrigger>
          <TabsTrigger
            className='px-8'
            value="testresult">
            <Image
              src={icons.resultsIcons}
              alt='result'
              width={20}
              height={20}
            />
            Test Result
          </TabsTrigger>
        </TabsList>
        <TabsContent value="testcase">
          <TestCase
            slug={slug}
            testcases={config?.[slug]?.testcases || []}
          />
        </TabsContent>
        <TabsContent value="testresult">Run To check the results.</TabsContent>
      </Tabs>
      <div className='absolute top-2 right-1 gap-2 flex px-2'>
        <p
          onClick={e => resetTestCase(slug)}
          className='inline-flex items-center text-sm font-normal gap-1 cursor-pointer'>
          Reset TestCase
          <Image
            alt='cancel'
            src={icons.resetIcon}
            width={16}
            height={16}
          />
        </p>
      </div>
    </div>
  )
}

export default DisplayTest