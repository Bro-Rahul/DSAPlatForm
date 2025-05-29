import { Button } from "../ui/button"
import Image from "next/image"
import { icons } from "@/constants/icons"
import useProblem from "@/store/useProblem"
import { getFormatedDateString } from "@/util"
import { decodeTestCases } from "@/lib/utils"


const RejectionResult = () => {
    const { data } = useProblem();
    const { submissionResult } = data;
    const formatedDate = getFormatedDateString(submissionResult?.payload.dateTimestr!);
    const { formatedTestCase } = decodeTestCases(submissionResult?.payload.testcase!);
    const outputs = submissionResult!.payload!.outputs!.split(" ");
    let content;
    if (submissionResult?.payload.timeOut) {
        content = <div className="flex flex-col w-full bg-zinc-800 text-zinc-100 p-4 rounded-lg shadow-sm border border-zinc-700">
            <p className="text-base font-medium mb-1">⏰ Time Limit Exceeded!!</p>
        </div>
    } else if (submissionResult?.payload.executionError) {
        content = <div className="flex flex-col w-full bg-zinc-800 text-zinc-100 p-4 rounded-lg shadow-sm border border-zinc-700">
            <p className="text-base font-medium mb-1">⚠️ Execution Error</p>
            <p className="text-sm text-zinc-300">{submissionResult.payload.error}</p>
        </div>
    } else {
        content = <>
            <div className='flex w-full bg-zinc-700/55 py-3 px-5 rounded-xl'>
                {outputs[0]}
            </div>
            <p className='font-normal text-zinc-400'>Expected</p>
            <div className='flex w-full bg-zinc-700/55 py-3 px-5 rounded-xl'>
                {outputs[1]}
            </div>
        </>
    }
    return (
        <div className='flex flex-col w-full px-25 gap-5'>
            <div className='flex justify-between items-center gap-5'>
                <div>
                    <p className='font-bold text-2xl text-[rgba(244,63,94,.9)]'>Wrong Answer <span className='text-sm font-bold text-gray-500 '>{submissionResult?.payload.totalPassed} testcases passed</span></p>
                    <span>submitted at {formatedDate}</span>
                </div>
                <Button className='bg-zinc-700 cursor-pointer text-white hover:bg-zinc-600'>
                    <Image src={icons.editorailIcon} alt='editorail' width={20} height={20} />
                    Editorial
                </Button>
            </div>
            <div className='flex flex-col gap-2'>
                <p className='font-normal text-zinc-400'>Input</p>
                {formatedTestCase.map((testcase) => (
                    Object.entries(testcase).map(([key, val], index) =>
                        <div key={index} className='flex w-full bg-zinc-700/55 py-3 px-5 rounded-xl'>
                            {key}=<br />{val}
                        </div>
                    )))}
                <p className='font-normal text-zinc-400'>Output</p>
                {content}
            </div>
            <div>
                <p className='font-normal text-zinc-400'>Code : Java</p>
                <p>code here with monaco editor </p>
            </div>
        </div>
    )
}

export default RejectionResult;