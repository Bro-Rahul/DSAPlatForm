import { LanguageSupportedType } from "@/types/store"
import {create} from "zustand"

type ResultType = {
    id:number,
    totalPassed : string,
    dateTimestr : string,
    testcase : string,
    outputs : string,
    timeOut : boolean,
    executionError:boolean,
    error : string,
    timeOutAt : number|null,
    code : string,
    lang : keyof LanguageSupportedType
}

type SubmissionsResultType = {
    statue : "Accepted"|"Rejected",
    payload : ResultType
}


type SolveProblemType = {
    submissionResult : SubmissionsResultType|null,
}

type SubmissionManagementType = {
    data : SolveProblemType,
    displaySubmitResults : (statue:"Accepted"|"Rejected",payload:ResultType)=>void
}

const useProblem = create<SubmissionManagementType>()(
    (set)=>({
        data : {
            isSubmitted : null,
            submissionResult : null,
        },
       
        displaySubmitResults : (statue,payload)=>{
            set((state)=>({
                data : {
                    ...state.data,
                    submissionResult : {
                        statue,
                        payload : payload,
                    }
                }
            }))
        }
    })
)



export default useProblem