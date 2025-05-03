import { UpdateProblemResponseType } from '@/types/response'
import React from 'react'
import { Badge } from '@/components/ui/badge'
import MdxDescription from './MdxDescription'
import ProblemMetaDetails from './ProblemMetaDetails'


const ProblemAbouts: React.FC<{
    problem: UpdateProblemResponseType
}> = ({ problem }) => {
    return (
        <div className='custom-scrollbar flex flex-col w-full p-2 px-5 mt-2 gap-8 overflow-y-scroll'>
            <div className='flex justify-between w-full'>
                <h1 className='text-3xl font-bold'>{problem.id}.{problem.title}</h1>
                <Badge className={problem.difficulty.toLowerCase()}>{problem.difficulty}</Badge>
            </div>
            <MdxDescription
                mdxString={problem.description}
            />
            <ProblemMetaDetails
                hints={problem.hints.split("\n")}
                tags={problem.tags}
            />
        </div>
    )
}

export default ProblemAbouts