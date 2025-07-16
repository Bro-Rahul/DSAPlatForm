export type SubmitResponseType = {
    id : number,
    status: "Rejected"|"Accepted",
    inValidTestCase: boolean,
    executionError: boolean,
    timeOut: boolean,
    timeOutAt: number|null,
    output: string,
    testcasePassed: string,
    testcase: string,
    errors: string,
    dateTimestr : string
}

export type PostProblemCommentPayloadType = {
    comment : string,
    problem : number
}

export type PatchProblemCommentPayloadType = {
    comment : string,
    comment_type : string
}