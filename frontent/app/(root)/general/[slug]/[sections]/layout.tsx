
import ProblemLayout from '@/components/layouts/ProblemLayout'
import React from 'react'

const layout:React.FC<{
    children : React.ReactNode,
    params : Promise<{sections:string,slug:string}>
}> = async ({children,params}) => {
    const {sections,slug} = await params;
    return (
        <ProblemLayout problemSlug={slug} activeSection={sections}>
            {children}
        </ProblemLayout>
    )
}

export default layout