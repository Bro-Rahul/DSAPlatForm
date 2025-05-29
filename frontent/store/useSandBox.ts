import { LanguageSupportedType, SandBoxManagerType } from "@/types/store"
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type SandBoxStoreType = {
    config: Record<string, SandBoxManagerType>,
    setInitials: (slug: string, payload: SandBoxManagerType) => void
    removeTestCase: (slug: string, index: number) => void
    updateTestCase: (slug: string, index: number, field: string, val: string) => void
    addTestCase: (slug: string) => void
    resetTestCase: (slug: string) => void
    updateCodes: (slug: string, lang: keyof LanguageSupportedType, code: string) => void
}

const initialState: SandBoxManagerType = {
    selectedLang: "java",
    starterCode: { cpp: "", java: "", javascript: "", python: "" },
    testcases: []
}

const useSandBox = create<SandBoxStoreType>()(
    persist(
        (set) => ({
            config: {},
            setInitials: (slug, payload) =>
                set((state) => ({
                    config: {
                        ...state.config,
                        [slug]: payload
                    }
                })),

            removeTestCase: (slug, index) =>
                set((state) => ({
                    config: {
                        ...state.config,
                        [slug]: {
                            ...state.config[slug],
                            testcases: state.config[slug].testcases.filter((_, i) => i !== index)
                        }
                    }
                })),
            updateTestCase: (slug, index, field, val) =>
                set((state) => ({
                    config: {
                        ...state.config,
                        [slug]: {
                            ...state.config[slug],
                            testcases: state.config[slug].testcases.filter((testcase, i) => i === index ? {
                                ...testcase,
                                [field]: val
                            } : testcase)
                        }
                    }
                })),
            addTestCase: (slug) =>
                set((state) => {
                    const prevTestcases = state.config[slug].testcases;
                    const lastTestcase = prevTestcases[prevTestcases.length - 1];
                    const newTestcase = { ...lastTestcase };

                    return {
                        config: {
                            ...state.config,
                            [slug]: {
                                ...state.config[slug],
                                testcases: [...prevTestcases, newTestcase],
                            },
                        },
                    };
                }),
            resetTestCase: (slug) =>
                set((state) => {
                    const initialState = [state.config[slug].testcases[0], state.config[slug].testcases[1]]
                    return {
                        config: {
                            ...state.config,
                            [slug]: {
                                ...state.config[slug],
                                testcases: initialState
                            }
                        }
                    }
                }),
            updateCodes: (slug: string, lang, code) =>
                set((state) => ({
                    config: {
                        ...state.config,
                        [slug]: {
                            ...state.config[slug],
                            starterCode: {
                                ...state.config[slug].starterCode,
                                [lang]: code
                            }
                        }
                    }
                }))

        }),
        {
            name: "editor"
        }
    )
)

export default useSandBox