import React from "react";
import { getProblem } from "@/http/general/problemHttp";
import UpdateProblemCard from "@/components/updateProblems/UpdateProblemCard";
import { UpdateProblemType } from "@/types/store";
import { decodeTestCases } from "@/lib/utils";

const UpdateProblem: React.FC<{
  params : Promise<{slug:string}>
}> = async ({params}) => {
  const {slug} = await params;
  const response = await getProblem(slug);
  const {formatedTestCase,inputParameters} = decodeTestCases(response.testcases);
  const data:UpdateProblemType = {
    ...response,
    testcases : formatedTestCase,
    inputParameters
  }
  return (
    <UpdateProblemCard problem={data} slug={slug}/>
  );
};

export default UpdateProblem;
