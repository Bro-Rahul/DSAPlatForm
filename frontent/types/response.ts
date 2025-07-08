import { LanguageSupportedType, ParameterType } from "./store";

export type UpdateProblemResponseType = {
    id: number,
    tags: string[],
    difficulty: string,
    title: string,
    description: string,
    slug: string,
    hints: string,
    testcases: string,
    starter_codes: LanguageSupportedType,
    solution_codes: LanguageSupportedType,
    inputParameters: ParameterType[],
}

export type ProblemDescriptionResponseType = {
    id: number,
    tags: string[]
    difficulty: string,
    title: string,
    description: string,
    slug: string,
    hints: string
}

export type ProblemCodesAndTestCaseResponseType = {
    testcases: string,
    starter_codes: LanguageSupportedType
}

export type ProblemCommentResponseType = {
    id: number,
    user: number,
    comment: string,
    problem: number,
    comment_type: string,
    subcomment_id: number,
    created_at: string,
    likes: number,
    dislikes: number,
    user_vote: "Liked"|"DisLiked"|"Not Voted"
    username : string,
    avatar : null|string
}