import { TextCaseContext } from '@/context/TestCaseProvider'
import { encodeTestCases } from '@/lib/utils';
import { TestCaseResultsType } from '@/types/submissions';
import React, { useContext } from 'react'

const useTestCaseProvider = () => {
    const context = useContext(TextCaseContext);
    if(!context){
      throw Error('useTestCaseProvider component Should be use inside the TestCaseContext Components ');
    }
    const { setTestCases,results } = context;

    const resetTestCase = ()=>{
      setTestCases(pre=>{
        const resetTests = pre.testcases.filter((_,i)=>i<=1);
        return {
          ...pre,
          testcases : resetTests
        };
      });
    }

    const addTestCase = ()=>{
      setTestCases(pre=>{
        const updatedTestCases = [...pre.testcases,pre.testcases[pre.testcases.length-1]]
        return {
          ...pre,
          testcases : updatedTestCases
        };
      });
    }

    const removeTestCase = (index:number)=>{
      setTestCases(pre=>{
        const updatedTestCases = pre.testcases.filter((_,i)=>i!==index);
        return {
          ...pre,
          testcases : updatedTestCases 
        };
      });
    }

    const updatedTestCase = (index:number,key:string,val:string)=>{
      setTestCases(pre=>{
        const updatedTestCases = pre.testcases.map((tests,i)=>i===index?{...tests,[key]:val}:tests);
        return {
          ...pre,
          testcases : updatedTestCases
        }
      });
    }

    const getEncodedTestCases = ()=>{
      const rawTestCase = encodeTestCases(results.testcases);
      return rawTestCase;
    }

    const updateTestCaseResults = (payload:TestCaseResultsType)=>{
      setTestCases(pre=>({
        ...pre,
        testresults : payload
      }));
    }

    return {
      ...results,
      setTestCases,
      resetTestCase,
      addTestCase,
      updatedTestCase,
      removeTestCase,
      getEncodedTestCases,
      updateTestCaseResults
    }
}

export default useTestCaseProvider