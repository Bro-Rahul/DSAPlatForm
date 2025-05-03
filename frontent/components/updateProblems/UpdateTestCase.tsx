import TestCaseCard from "../utils/TestCaseCard"
import useUpdateProblem from "@/store/useUpdateProblem"
import React from "react";
import { UpdateProblemType } from "@/types/store";

const UpdateTestCase:React.FC<{
    problem : UpdateProblemType
}> = ({problem}) => {
    const {problems,setProblem} = useUpdateProblem();
    return (
        <div className="w-full flex flex-col ">
            <h1 className="label">Example Test Cases </h1>
            
            <TestCaseCard
                inputParameters={problem.inputParameters}
                testcases={problem.testcases}
                onChange={()=>{}}
                onRemoveParameter={()=>{}}
            />
        </div>
    )
}

export default UpdateTestCase