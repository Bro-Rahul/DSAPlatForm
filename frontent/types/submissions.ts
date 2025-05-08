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
    errors: string|InValidTestCaseType,
    result: string[]
}