import { LanguageSupportedType, ParameterType, SetProblemType, TestCaseType } from "@/types/store"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function checkType(literal: string): string {
  try {
    const value = JSON.parse(literal);

    if (Array.isArray(value)) {
      return "array";
    }

    if (value === null) return "null";
    if (typeof value === 'object') return "object";

    return typeof value;
  } catch {
    return typeof literal;
  }
}

export function encodeTestCases(testcases: TestCaseType[]): string {
  const testcase: string[] = []
  for (const test of testcases) {
    const { expectedOutput, ...input } = test;
    const inputs = Object.entries(input);
    let temp: string = ""
    for (let i = 0; i < inputs.length; i++) {
      const [key, val] = inputs[i]
      if (i === inputs.length - 1) {
        temp += `${key}=${val}`
      } else {
        temp += `${key}=${val}~`
      }
    }
    // temp += `$${expectedOutput}`  remove the output from the testcase not needed to store output
    testcase.push(temp);
  }
  return testcase.join("\n");
}


export function formateSetProblemBodyData(payload: SetProblemType) {
  const { inputParameters, ...rest } = payload;
  const testcase: string = encodeTestCases(rest.testcases);
  const hints = rest.hints.join("\n");

  return {
    ...rest,
    testcases: testcase,
    hints
  }
}

export function decodeTestCases(testcases: string): {
  formatedTestCase: TestCaseType[],
  inputParameters: ParameterType[]
} {
  const testcase: string[] = testcases.split("\n");
  const formatedTestCase: TestCaseType[] = [];
  const inputParameters: ParameterType[] = [];
  let parametersAdded: boolean = false;
  for (const test of testcase) {
    // const [inputs,outputs] = test.split("$");
    const inputsFields = test.split("~")
    const temp: string[][] = [];
    for (let i = 0; i < inputsFields.length; i++) {
      const [input, output] = inputsFields[i].split("=");
      temp.push([input, output]);
      if (!parametersAdded) {
        inputParameters.push({ parameterName: input, parameterType: checkType(output) });
      }
    }
    parametersAdded = true;
    const finalTestCase = Object.fromEntries(temp);
    // finalTestCase['expectedOutput'] = outputs;
    formatedTestCase.push(finalTestCase);
  }
  return {
    formatedTestCase,
    inputParameters
  };
}

export const getSolutionStarterString = (code: string, lang: keyof LanguageSupportedType): string => {
  const mdxString = `
# Intuition
<!-- Describe your first thoughts on how to solve this problem. -->

# Approach
<!-- Describe your approach to solving the problem. -->

# Complexity
- Time complexity:
<!-- Add your time complexity here, e.g. $$O(n)$$ -->

- Space complexity:
<!-- Add your space complexity here, e.g. $$O(n)$$ -->

# Code
## ${lang}
\`\`\` ${lang}
${code}
\`\`\`
`
  return mdxString;
}