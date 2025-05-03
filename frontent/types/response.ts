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