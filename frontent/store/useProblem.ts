import { LanguageSupportedType } from "@/types/store"
import {create} from "zustand"

type ResultType = {
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

export type ToggleTabType = "description"|"Submissions"|"Solutions"|"Accepted" | "Rejected"

type SolveProblemType = {
    tab : ToggleTabType
    submissionResult : SubmissionsResultType|null,
}

type SubmissionManagementType = {
    data : SolveProblemType,
    onToggle : (to:ToggleTabType)=>void,
    displaySubmitResults : (statue:"Accepted"|"Rejected",payload:ResultType)=>void
}

const useProblem = create<SubmissionManagementType>()(
    (set)=>({
        data : {
            isSubmitted : null,
            submissionResult : null,
            tab : "description"
        },
        onToggle : (to)=>{
            set((state)=>({
                data : {
                    ...state.data,
                    tab : to
                }
            }))
        },
        displaySubmitResults : (statue,payload)=>{
            set((state)=>({
                data : {
                    ...state.data,
                    tab : statue,
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