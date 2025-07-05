import React from 'react'
import { Badge } from '@/components/ui/badge'
import MdxDescription from './MdxDescription'
import ProblemMetaDetails from './ProblemMetaDetails'
import { getProblemDescription } from '@/http/general/problemHttp'


const ProblemDescription: React.FC<{
    slug:string
}> = async ({ slug }) => {
    const problem = await getProblemDescription(slug);
    
    return (
        <div className='flex flex-col w-full px-5 gap-8 bg-zinc-800'>
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

export default ProblemDescription