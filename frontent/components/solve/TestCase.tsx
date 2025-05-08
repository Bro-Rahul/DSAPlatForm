import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "../ui/input";
import { TestCaseType } from "@/types/store";
import Image from "next/image";
import { icons } from "@/constants/icons";
import { useState } from "react";
import useTestCaseProvider from "@/hook/useTestCaseProvider";

const TestCase: React.FC<{
  testcases: TestCaseType[]
  slug: string
}> = ({ testcases, slug }) => {
  const displayTestCases = testcases.map(({expectedOutput,...fields})=>fields)
  const [selectedTab,setSelectedTab] = useState<number>(1)
  const {removeTestCase,addTestCase,updatedTestCase} = useTestCaseProvider();

  const handleRemoveTab = (index:number)=>{
    removeTestCase(index);
    setSelectedTab(pre=>pre-1);
  }

  const toggleTabs = (tab:string)=>{
    setSelectedTab(+tab);
  }

  return (
    <div className='flex items-center w-full'>
      <Tabs value={selectedTab.toString()} onValueChange={toggleTabs} className='w-full'>
        <div className="flex w-full">
          <TabsList className='border-b-2 items-start justify-start flex gap-4'>
            {testcases.map((_, i) => (  
              <TabsTrigger 
                value={`${i + 1}`} key={`${i}`} 
                className="relative group"
                >
                {testcases.length > 2 && <Image
                  src={icons.crossIcon}
                  alt="cross icon"
                  width={18}
                  height={18}
                  className="absolute -top-1 -right-1 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={e => handleRemoveTab(i)}
                />}
                {`Case ${i + 1}`}
              </TabsTrigger>
            ))}
          </TabsList>
          <span 
            className="add-testcase"
            onClick={addTestCase}
          >+</span>
        </div>
        {displayTestCases.map((item, i) => (
          <TabsContent value={`${i + 1}`} key={i} className="flex flex-col gap-4 ">
            {Object.entries(displayTestCases[i]).map(([keys, value], j) => (
              <div className='px-3' key={`1-${j}`}>
                <p>{keys}</p>
                <Input
                  className='bg-transparent w-full outline-none'
                  type="text"
                  defaultValue={value}
                  onChange={e => updatedTestCase(i,keys,e.target.value)}
                />
              </div>
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

export default TestCase;
