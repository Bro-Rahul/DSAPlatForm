import React from 'react'
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import SandBox from '@/components/solve/SandBox'
import { getProblemEditorCodesAndTestCases } from '@/http/general/problemHttp'
import { decodeTestCases } from '@/lib/utils'

const layout: React.FC<{
    children: React.ReactNode,
    params: Promise<{ slug: string }>
}> = async ({ children, params }) => {
    const { slug } = await params
    const response = await getProblemEditorCodesAndTestCases(slug);
    const { formatedTestCase } = decodeTestCases(response.testcases)
    return (
        <div className='flex flex-col w-full h-[100vh] bg-zinc-800'>
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel defaultSize={100} minSize={20}>
                    {children}
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={100} minSize={0}>
                    <div className='grid grid-cols-1 w-full h-[100vh]'>
                        <SandBox
                            starterCodes={response.starter_codes}
                            testcases={formatedTestCase}
                            slug={slug}
                        />
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    )
}
export default layout;