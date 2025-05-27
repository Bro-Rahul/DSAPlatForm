import useTestCaseProvider from '@/hook/useTestCaseProvider'
import { TestCaseType } from '@/types/store';
import { InValidTestCaseType } from '@/types/submissions';
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';


const TestResult = () => {
  const { testresults, testcases } = useTestCaseProvider();
  let content;
  if (!testresults) {
    content = <p>Run Code to See the Outputs</p>
  } else if (!testresults.allPass) {
    content =
      <TestResultErrors
        error={testresults.errors}
        isTimeOut={testresults.timeOut}
        timeOutAt={testresults.timeOutAt}
      />
  } else {
    content = <TestCasePassResults results={testresults.result} testcases={testcases} />
  }

  return (
    <div>{content}</div>
  )
}

export default TestResult


const TestResultErrors: React.FC<{
  error: string | InValidTestCaseType,
  isTimeOut: boolean
  timeOutAt: number | null
}> = ({ error, isTimeOut, timeOutAt }) => {
  let message;
  if (typeof error == "string") {
    message = <div className="flex flex-col w-full bg-zinc-800 text-zinc-100 p-4 rounded-lg shadow-sm border border-zinc-700">
      <p className="text-base font-medium mb-1">{isTimeOut ? `⏰ Time Limit Exceeded!!` : '⚠️ Execution Error'}</p>
      <p className="text-sm text-zinc-300">{isTimeOut ? `for test case ${timeOutAt}` : error}</p>
    </div>
  } else {
    message = <div className="flex flex-col w-full bg-zinc-800 text-zinc-100 p-4 rounded-lg shadow-sm border border-zinc-700">
      <p className="text-base font-medium mb-1">❗ Invalid Test Case</p>
      <p className="text-md text-zinc-400">TestCase: {error.at}</p>
      <p className="text-md text-zinc-300 mt-1">Reason: {error.error[0]}</p>
    </div>

  }
  return (
    <div className='flex w-full'>
      {message}
    </div>
  )
}

const TestCasePassResults: React.FC<{
  results: string[];
  testcases: TestCaseType[];
}> = ({ results, testcases }) => {
  const displayTestCases = testcases.map(({ expectedOutput, ...fields }) => fields).slice(0, results.length);

  return (
    <div className="flex items-center w-full">
      <Tabs defaultValue="1" className="w-full">
        <div className="flex w-full">
          <TabsList className="border-b-2 items-start justify-start flex gap-4">
            {displayTestCases.map((_, i) => (
              <TabsTrigger
                value={`${i + 1}`}
                key={`${i}`}
                className="relative group"
              >
                {`Case ${i + 1}`}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {displayTestCases.map((item, i) => {
          const [got, expected] = results[i]?.split(" ") || ["N/A", "N/A"];

          return (
            <TabsContent
              value={`${i + 1}`}
              key={i}
              className="flex flex-col gap-4"
            >
              {Object.entries(displayTestCases[i]).map(([key, value], j) => (
                <div className="px-3" key={`1-${j}`}>
                  <p className="font-semibold">{key}</p>
                  <p className="bg-transparent w-full outline-none text-zinc-300">
                    {value}
                  </p>
                </div>
              ))}

              <div className="px-3 mt-1">
                <p className="font-semibold">Output</p>
                <p
                  className={`bg-transparent w-full outline-none ${expected === got ? "text-green-400" : "text-red-400"
                    }`}
                >
                  {got}
                </p>
              </div>
              {/* Expected and Got values */}
              <div className="px-3 mt-2">
                <p className="font-semibold">Expected Output</p>
                <p className="bg-transparent w-full outline-none text-green-400">
                  {expected}
                </p>
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
};
