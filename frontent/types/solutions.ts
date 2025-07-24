export type TagAndCountType = {
    tag: string,
    count: number
}

export type AvailableTagsType = {
    tags: TagAndCountType[]
}

export type AvailableSolutionType = {
    id: number,
    problem: number,
    user: number,
    tags: string[],
    title: string,
    solution_text: string
}

export type PostSolutionType = {
    problem : number,
    solution_tags : string[],
    solution_text : string,
    title : string
}