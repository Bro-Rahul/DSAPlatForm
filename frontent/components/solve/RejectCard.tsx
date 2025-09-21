"use client"

import { SubmissionsHistoryType } from "@/types/submissions";
import React from "react";
import { getFormatedDateString } from "@/util";
import useProblem from "@/store/useProblem";
import { useParams, useRouter } from "next/navigation";
const RejectedCard:React.FC<{
    result : SubmissionsHistoryType
}> = ({result}) => {
    const {displaySubmitResults} = useProblem();
    const {slug} = useParams<{slug:string}>()
    const router = useRouter();
    const handleClick = ()=>{
        router.push(`/problems/${slug}/result`)
        displaySubmitResults("Rejected",{
            id : result.id,
            dateTimestr : result.details.dateTimestr,
            error : result.details.errors,
            executionError : result.details.executionError,
            outputs : result.details.output,
            testcase : result.details.testcase,
            timeOut : result.details.timeOut,
            timeOutAt : result.details.timeOutAt,
            totalPassed : result.details.testcasePassed,
            code : result.submission_code,
            lang : result.submission_lang
        })
    }
    return (
        <li className='w-full p-2 odd:bg-zinc-700/50'>
            <div onClick={handleClick} className='flex flex-row justify-between items-center rounded-xl px-4 py-1 text-white cursor-pointer'>
                <p className="text-zinc-300"><span className="font-bold text-red-400 text-lg">Rejected </span>{result?.details.testcasePassed} passed<br /> <span className="text-sm text-stone-300">{getFormatedDateString(result.details.dateTimestr)}</span></p>
                <p>{result.submission_lang.toUpperCase()}</p>
            </div>
        </li>
    )
}
export default RejectedCard;