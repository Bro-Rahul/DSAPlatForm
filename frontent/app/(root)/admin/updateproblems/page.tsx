import options from '@/app/api/auth/[...nextauth]/options';
import ProblemTable from '@/components/utils/ProblemTable';
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation';
import {getProblemList} from '@/http/admin/problemHttp';


const UpdateProblemsListPage = async () => {
  const session = await getServerSession(options);
  if(!session) redirect('/auth/login');
  const response = await getProblemList(session.user.access);

  return (
    <ProblemTable problems={response}/>
  )
}

export default UpdateProblemsListPage