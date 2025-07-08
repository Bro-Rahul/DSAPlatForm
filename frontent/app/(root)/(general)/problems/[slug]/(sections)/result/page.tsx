"use client"
import AcceptedResult from '@/components/solve/AcceptedResult';
import RejectionResult from '@/components/solve/RejectedResult';
import useProblem from '@/store/useProblem';
import { useParams,useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const ResultPage = () => {
  const { data: { submissionResult } } = useProblem();
  const router = useRouter();
  const { slug } = useParams<{ slug: string }>()

  useEffect(() => {
    if (!submissionResult?.statue) {
      router.replace(`/general/${slug}/description`)
    }
  }, []);
  if(!submissionResult?.statue){
    return null;
  }else if(submissionResult.statue === "Accepted"){
    return <AcceptedResult/>
  }else{
    return <RejectionResult />
  }
}

export default ResultPage