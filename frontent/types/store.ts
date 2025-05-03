export type TestCaseType = {
    [key: string]: string,
    expectedOutput: string,
}

export type ParameterType = {
    parameterName: string,
    parameterType: string
}

export type SetProblemType = {
    title: string;
    level: string;
    description: string;
    tags: string[];
    testcases : TestCaseType[]; 
    inputParameters: ParameterType[],
    hints: string[];
};

export type UserType = {
    id: number,
    username: string,
    first_name: string,
    last_name: string,
    access: string,
    image: string,
    isAdmin: boolean,
    email: string,
}

export type LanguageSupportedType = {
    java : string,
    cpp : string,
    python : string,
    javascript : string,
}


export type UpdateProblemType = {
    id: number,
    tags: string[],
    difficulty: string,
    title : string,
    description: string,
    slug: string,
    hints: string,
    testcases: TestCaseType[],
    starter_codes: LanguageSupportedType,
    solution_codes: LanguageSupportedType,
    inputParameters : ParameterType[],
}

export type SandBoxManagerType = {
    testcases : TestCaseType[],
    starterCode : LanguageSupportedType,
    selectedLang : keyof LanguageSupportedType

}