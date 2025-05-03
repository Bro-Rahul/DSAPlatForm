import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ParameterType, SetProblemType } from '@/types/store';
import { mdxString } from '@/constants/data';

export type Operations = "ADD" | "DELETE" | "UPDATE"

type ProblemState = {
  problem: SetProblemType;
  updateSingleValueFields: (payload: Partial<SetProblemType>) => void;
  updateMultiValueFields: (operation: Operations, on: "hints" | "tags", index?: number, value?: string) => void
  addNewParameter: (payload: ParameterType) => void;
  resetProblem: () => void;
  updateParameterValue: (index: number, field: string, value: string) => void
  removeParameter: (field: string) => void
};

const initialState: SetProblemType = {
  title: '',
  level: 'Easy',
  description: mdxString,
  tags: [],
  inputParameters: [],
  testcases: [{ expectedOutput: "" }, { expectedOutput: "" }],
  hints: [],
};

const useSetProblem = create<ProblemState>()(
  persist(
    (set) => ({
      problem: initialState,
      updateMultiValueFields: (operation, on, index, val) =>
        set((state) => {
          let updatedField = state.problem[on];
          switch (operation) {
            case "ADD":
              updatedField.push("");
              return {
                problem: {
                  ...state.problem,
                  [on]: updatedField
                }
              }
            case "DELETE":
              updatedField = updatedField.filter((_, i) => i !== index);
              return {
                problem: {
                  ...state.problem,
                  [on]: updatedField
                }
              }
            case "UPDATE":
              updatedField = updatedField.map((item, i) => i === index ? val! : item);
              return {
                problem: {
                  ...state.problem,
                  [on]: updatedField
                }
              }
          }
        }),
      updateSingleValueFields: (payload) =>
        set((state) => ({
          problem: {
            ...state.problem,
            ...payload,
          },
        })),
      resetProblem: () => set({ problem: initialState }),
      addNewParameter: (payload) =>
        set((state) => ({
          problem: {
            ...state.problem,
            inputParameters: [
              ...state.problem.inputParameters,
              payload
            ],
          }
        })),
      updateParameterValue: (index, field, value) =>
        set((state) => ({
          problem: {
            ...state.problem,
            testcases: state.problem.testcases.map((item, i) => i !== index ? item : { ...item, [field]: value })
          }
        })),
      removeParameter: (field) =>
        set((state) => ({
          problem: {
            ...state.problem,
            inputParameters: state.problem.inputParameters.filter(
              (inputField) => inputField.parameterName !== field
            ),
            testcases: state.problem.testcases.map((testcase) => {
              const { [field]: _, ...rest } = testcase;
              return {
                ...rest,
                expectedOutput: testcase.expectedOutput
              };
            }),
          },
        }))

    }),
    {
      name: 'setproblem',
    }
  )
);

export default useSetProblem;
