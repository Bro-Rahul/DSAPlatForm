import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import React from "react"

const ToolTip:React.FC<{
    component : React.ReactNode,
    hoverContent : string,
    className?: string,
}> = ({component,hoverContent,className}) => {
    return (
        <Tooltip>
            <TooltipTrigger className={'w-full h-full'}>{component}</TooltipTrigger>
            <TooltipContent className={className}>
                <p>{hoverContent}</p>
            </TooltipContent>
        </Tooltip>
    )
}

export default ToolTip