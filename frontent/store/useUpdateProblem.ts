"use client"
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { LanguageSupportedType, UpdateProblemType } from '@/types/store';

type UpdateProbleStoreType = {
    problems: Record<string, UpdateProblemType>,
    setProblem: (slug: string, problemData: UpdateProblemType) => void,
    updateProblemSingleFields: (slug: string, payload: Partial<UpdateProblemType>) => void
};


const initialLang :LanguageSupportedType = {
    cpp : "",
    java : "",
    javascript : "",
    python : ""
}


export const initialState: UpdateProblemType = {
    description: '',
    difficulty: '',
    hints: "",
    id: -1,
    slug: '',
    solution_codes: initialLang,
    starter_codes: initialLang,
    tags: [],
    testcases: [],
    title: '',
    inputParameters : []
}; 

const useUpdateProblem = create<UpdateProbleStoreType>()(
    persist(
        (set, get) => ({
            problems: {},
            setProblem: (slug, problemData) =>
                set((state) => ({
                    problems: {
                        ...state.problems,
                        [slug]: problemData,
                    },
                })),
            updateProblemSingleFields: (slug, payload) =>
                set((state) => ({
                    problems: {
                        ...state.problems,
                        [slug]: {
                            ...state.problems[`${slug}`],
                            ...payload
                        }
                    }
                })),
        }),
        {
            name: 'updateProblems',
        }
    )
);

export default useUpdateProblem;
