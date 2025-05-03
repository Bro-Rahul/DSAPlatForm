import options from '@/app/api/auth/[...nextauth]/options';
import ProblemTable from '@/components/utils/ProblemTable';
import { getProblemList } from '@/http/problemHttp'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation';
import React from 'react'


const UpdateProblemsListPage = async () => {
  const session = await getServerSession(options);
  if(!session) redirect('/auth/login');
  const response = await getProblemList(session.user.access);

  return (
    <ProblemTable problems={response}/>
  )
}

export default UpdateProblemsListPage