export type SubmitResponseType = {
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