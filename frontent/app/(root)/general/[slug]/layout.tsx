import React from 'react'
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import ProblemLayout from '@/components/layouts/ProblemLayout';

const layout: React.FC<{
    children: React.ReactNode,
    params : Promise<{slug:string}>
}> = async ({ children,params }) => {
    const {slug} = await params
    return (
        <div className='flex flex-col w-full h-[100vh] bg-zinc-800'>
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel defaultSize={100} minSize={20}>
                    {children}
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={100} minSize={0}>
                    <div style={{ width: '30%', background: '#f0f0f0', padding: '1rem', color: 'black' }}>
                        <h2>Right Side (Static)</h2>
                        <p>This doesn't change with route.</p>
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    )
}
export default layout;