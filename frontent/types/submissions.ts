import { LanguageSupportedType } from "./store"

export type InValidTestCaseType = {
    valid: boolean,
    at: number,
    error: string[]
}

export type TestCaseResultsType = {
    allPass: boolean,
    inValidTestCase: boolean,
    executionError: boolean,
    timeOut: boolean,
    timeOutAt : number|null,
    errors: string|InValidTestCaseType
    result: string[]
}

export type SubmissionDetailType = {
    status: "Rejected" | "Accpted",
    inValidTestCase : boolean,
    executionError : boolean,
    timeOut: boolean,
    timeOutAt : number|null, 
    testcasePassed : string,
    testcase: string,
    output : string,
    errors:string,
    dateTimestr : string

}

export type SubmissionsHistoryType = {
    id : number,
    submission_code : string,
    submission_lang : keyof LanguageSupportedType,
    details : SubmissionDetailType,
    created_at : string,
    status : "accepted"|"Rejected"
}