"use client"
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import AllSubmissions from './AllSubmissions'
import ProblemAbouts from './ProblemAbouts'
import { UpdateProblemResponseType } from '@/types/response'
import useProblem, { ToggleTabType } from '@/store/useProblem'
import AcceptedResult from './AcceptedResult'
import RejectionResult from './RejectedResult'

const ProblemTabs: React.FC<{
    problem: UpdateProblemResponseType
}> = ({ problem }) => {
    const { data, onToggle } = useProblem();
    const { tab, submissionResult } = data;
    let content;
    if(submissionResult?.statue == "Accepted"){
        content = <AcceptedResult/>
    }else if(submissionResult?.statue == "Rejected"){
        content = <RejectionResult/>
    }
    return (
        <Tabs value={tab} onValueChange={e => onToggle(e! as ToggleTabType)} className='overflow-y-scroll custom-scrollbar w-full'>
            <TabsList className='w-fit py-2 h-fit flex gap-5 cursor-pointer'>
                <TabsTrigger value="description">Description</TabsTrigger>
                {submissionResult?.statue && <TabsTrigger value={submissionResult.statue}>
                    {submissionResult.statue}
                </TabsTrigger>}
                <TabsTrigger value="Submissions">Submissions</TabsTrigger>
                <TabsTrigger value="Solutions">Solutions</TabsTrigger>
            </TabsList>
            <TabsContent value="description">
                <ProblemAbouts problem={problem} />
            </TabsContent>
            <TabsContent value="Submissions">
                <AllSubmissions />
            </TabsContent>
            {submissionResult?.statue && <TabsContent value={submissionResult.statue}>
                {content}
            </TabsContent>}
            <TabsContent value="Solutions">
                Change your password here.
            </TabsContent>
        </Tabs>
    )
}

export default ProblemTabs