import React from 'react'
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"

const ProblemLayoutPage: React.FC<{
    children: React.ReactNode,
    Editor: React.ReactNode,
    problemDetails: React.ReactNode
}> = ({ Editor, children, problemDetails }) => {
    return (
        <div className='flex flex-col w-full h-[100vh] bg-zinc-800'>
            {children}
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel>{problemDetails}</ResizablePanel>
                <ResizableHandle />
                <ResizablePanel>{Editor}</ResizablePanel>
            </ResizablePanelGroup>
        </div>
    )
}

export default ProblemLayoutPage