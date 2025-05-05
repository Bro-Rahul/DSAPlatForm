import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getProblemList } from '@/http/general/problemHttp';
import { Badge } from '@/components/ui/badge';
import React from 'react'
import Link from 'next/link';


const GeneralHomePage = async () => {
  const problems = await getProblemList();
  return (
    <div className="flex justify-center items-center w-[800px] mx-auto mt-15">
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Sr.</TableHead>
            <TableHead className='w-[150px] text-center'>Title</TableHead>
            <TableHead>Level</TableHead>
            <TableHead>Tags</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {problems.map((problem, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>
                <Link href={`${`/general/${problem.slug}`}`}>
                  {problem.title}
                </Link>
              </TableCell>
              <TableCell>{problem.level}</TableCell>
              <TableCell>{problem.tags.map((item, i) => <Badge className='mx-1' key={i}>{item}</Badge>)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

    </div>
  )
}

export default GeneralHomePage