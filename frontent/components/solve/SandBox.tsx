"use client"
import { LanguageSupportedType, TestCaseType } from '@/types/store'
import React, { useEffect } from 'react'
import useSandBox from '@/store/useSandBox'
import DisplayTest from './DisplayTest'
import CodeEditor from './CodeEditor'

const SandBox: React.FC<{
  starterCodes: LanguageSupportedType,
  testcases: TestCaseType[]
  slug: string
}> = ({ slug, starterCodes, testcases }) => {
  const { setInitials } = useSandBox();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem("editor") ? JSON.parse(localStorage.getItem("editor")!) : null;
      if (data?.state?.config?.[slug]) {
        setInitials(slug, data?.state?.config?.[slug]);
      } else {
        setInitials(slug, {
          selectedLang: "cpp",
          starterCode: starterCodes,
          testcases: testcases
        })
      }
    }
  }, []);
  return (
    <div className='flex flex-col w-full'>
      <CodeEditor
        slug={slug}
      />
      <DisplayTest
        slug={slug}
      />
    </div>
  )
}

export default SandBox