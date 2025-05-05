import { LanguageSupportedType, TestCaseType } from "./store"

export type ProblemList = {
    slug : string,
    title : string,
    level : string,
    tags : string[],
}

export type ProblemSolveType = {
    id : number,
    title : string,
    level : string,
    description : string,
    hints : string,
    tags : string[],
    starterCodes : LanguageSupportedType,
    testcases : TestCaseType[]
}