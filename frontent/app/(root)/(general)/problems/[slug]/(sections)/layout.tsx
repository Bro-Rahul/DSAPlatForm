import ProblemLayout from '@/components/layouts/ProblemLayout'
import React from 'react'

const layout: React.FC<{
    params : Promise<{slug:string}>
    children: React.ReactNode,
}> = async ({ children,params }) => {
    const {slug} = await params;
    return (
        <ProblemLayout slug={slug}>
            {children}
        </ProblemLayout>
    )
}

export default layout

