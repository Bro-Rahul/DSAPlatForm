import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ProblemList } from '@/types/problem'
import Link from 'next/link'
import { Badge } from '../ui/badge'

const ProblemTable: React.FC<{
    problems: ProblemList[]
}> = ({ problems }) => {
    return (
        <div className="flex justify-center items-center">
            <Table className="w-full max-w-3xl mx-auto mt-15 shadow-md rounded-lg">
                <TableCaption className="text-lg font-semibold">List of Problems</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Sr</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Level</TableHead>
                        <TableHead>Tags</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {problems.map((problem, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">{index+1}</TableCell>
                            <TableCell className='hover:underline hover:text-blue-400 cursor-pointer'><Link href={`/admin/updateproblems/${problem.slug}`}>{problem.title}</Link></TableCell>
                            <TableCell>{problem.level}</TableCell>
                            <TableCell className="flex gap-2">{problem.tags.map((tag,i)=><Badge key={i}>{tag}</Badge>)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default ProblemTable
