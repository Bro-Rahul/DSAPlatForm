import React from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const ProblemLevel: React.FC<{
    value: string,
    onValueChange: (val: string) => void
    editable?: boolean,
    className? : string
}> = ({ onValueChange, value = "Easy", editable,className }) => {
    return (
        <p >
            <span>Level</span>
            <Select value={value}  onValueChange={onValueChange} disabled={!editable}>
                <SelectTrigger className={className}>
                    <SelectValue placeholder="Easy" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Levels</SelectLabel>
                        <SelectItem value="Easy">Easy</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Hard">Hard</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </p>
    )
}

export default ProblemLevel
