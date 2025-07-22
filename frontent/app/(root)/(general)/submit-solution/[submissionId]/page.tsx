import SolutionComponent from '@/components/submitSolution/SolutionComponent';
import { getSubmissionResultById } from '@/http/general/submissionHttp';
import React from 'react'

const SubmitSolutionPage:React.FC<{
  params : Promise<{submissionId:string}>
}> = async({params}) => {
  const {submissionId} = await params;
  const response = await getSubmissionResultById(submissionId);

  return (
    <SolutionComponent submissionData={response}/>
  )
}

export default SubmitSolutionPage