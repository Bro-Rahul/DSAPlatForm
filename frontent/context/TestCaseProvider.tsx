import { TestCaseType } from '@/types/store'
import { TestCaseResultsType } from '@/types/submissions'
import React, { createContext, useState, ReactNode } from 'react'

type TestCaseStateType = {
    testcases: TestCaseType[],
    testresults : TestCaseResultsType|undefined
}

type TestCaseContextType = {
    results : TestCaseStateType
    setTestCases: React.Dispatch<React.SetStateAction<TestCaseStateType>>
}


export const TextCaseContext = createContext<TestCaseContextType | undefined>(undefined)

const TestCaseProvider: React.FC<{
    children: ReactNode,
    testcases: TestCaseType[]
}> = ({ children, testcases }) => {
    const [allTestCase, setTestCases] = useState<TestCaseStateType>({
        testcases : testcases,
        testresults : undefined,
    });

    return (
        <TextCaseContext.Provider value={{results : allTestCase,setTestCases:setTestCases }}>
            {children}
        </TextCaseContext.Provider>
    )
}

export default TestCaseProvider
