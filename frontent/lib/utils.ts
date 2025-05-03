import { ParameterType, SetProblemType, TestCaseType } from "@/types/store"
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

export function encodeTestCases(testcases:TestCaseType[]):string{
  const testcase:string[] = []
  for(const test of testcases){
    const {expectedOutput,...input} = test;
    const inputs = Object.entries(input);
    let temp:string = ""
    for(let i=0;i<inputs.length;i++){
      const [key,val] = inputs[i]
      if(i === inputs.length-1){
        temp += `${key}=${val}`
      }else{
        temp += `${key}=${val}~`
      }
    }
    temp += `$${expectedOutput}`
    testcase.push(temp);
  }
  return testcase.join("\n");
}


export function formateSetProblemBodyData(payload:SetProblemType){
  const {inputParameters,...rest} = payload;
  const testcase:string = encodeTestCases(rest.testcases);
  const hints = rest.hints.join("\n");
  
  return {
    ...rest,
    testcases:testcase,
    hints
  }
}

export function decodeTestCases(testcases:string):{
  formatedTestCase : TestCaseType[],
  inputParameters : ParameterType[]
}{
  const testcase:string[] = testcases.split("\n");
  const formatedTestCase:TestCaseType[] = [];
  const inputParameters:ParameterType[] = [];
  let parametersAdded :boolean = false;
  for(const test of testcase){
    const [inputs,outputs] = test.split("$");
    const inputsFields = inputs.split("~")
    const temp:string[][] = [];
    for(let i=0;i<inputsFields.length;i++){
      const [input,output]= inputsFields[i].split("=");
      temp.push([input,output]);
      if(!parametersAdded){
        inputParameters.push({parameterName:input,parameterType:checkType(output)});
      }
    }
    parametersAdded = true;
    const finalTestCase = Object.fromEntries(temp);
    finalTestCase['expectedOutput'] = outputs;
    formatedTestCase.push(finalTestCase);
  }
  return {
    formatedTestCase,
    inputParameters
  };
}