"use client"

import useProblem from "@/store/useProblem";
import { SubmissionsHistoryType } from "@/types/submissions";
import { getFormatedDateString } from "@/util";
import { useParams, useRouter } from "next/navigation";
import React from "react";

const AcceptedCard: React.FC<{
    result: SubmissionsHistoryType
}> = ({ result }) => {
    const { displaySubmitResults} = useProblem();
    const router = useRouter();
    const {slug} = useParams<{slug:string}>()
    const handleClick = ()=>{
        router.push(`/problems/${slug}/result`);
        displaySubmitResults("Accepted",{
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
        });
    }
    return (
        <li className='flex flex-col w-full p-2 odd:bg-zinc-700/50'>
            <div onClick={handleClick} className='flex items-center rounded-xl px-4 py-1 text-white cursor-pointer'>
                <p className="text-zinc-300"><span className="font-bold text-green-600 text-lg">Accepted </span>{result?.details.testcasePassed} passed<br /> <span className="text-sm text-stone-300">{getFormatedDateString(result.details.dateTimestr)}</span></p>
            </div>
        </li>
    )
}

export default AcceptedCard;