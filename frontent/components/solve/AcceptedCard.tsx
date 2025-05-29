import useProblem from "@/store/useProblem";
import { submissionsHistoryType } from "@/types/submissions";
import { getFormatedDateString } from "@/util";
import React from "react";
const AcceptedCard: React.FC<{
    result: submissionsHistoryType
}> = ({ result }) => {
    const { displaySubmitResults} = useProblem();
    const handleClick = ()=>{
        displaySubmitResults("Accepted",{
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
        <section className='flex flex-col w-full p-2'>
            <div onClick={handleClick} className='flex items-center bg-[rgba(74,222,128,0.3)] rounded-xl px-4 py-1 text-white cursor-pointer'>
                <p>Accepted {result?.details.testcasePassed} passed<br /> {getFormatedDateString(result.details.dateTimestr)}</p>
            </div>
        </section>
    )
}

export default AcceptedCard;