import { Operations } from '@/store/useSetProblem'
import React from 'react'
import { Input } from '../ui/input'
import Image from 'next/image'
import { icons } from '@/constants/icons'

const ProblemHint: React.FC<{
    values : string[]
    onlyRead?: boolean,
    updateFields: (operation: Operations, on:"hints"|"tags", index?: number, value?: string) => void
}> = ({ values, onlyRead, updateFields }) => {
    return (
        <ul className={`flex w-full gap-3 flex-wrap ml-2`}>
            {values.map((value, index) => (
                <li className="flex items-center w-full gap-2 px-3 py-2 rounded-md" key={index}>
                    {!onlyRead ? (
                        <Input
                            className="w-full"
                            value={value}
                            onChange={e => updateFields("UPDATE", "hints", index, e.target.value)}
                        />
                    ) : (
                        <span className="w-full text-md font-semibold">{value}</span>
                    )}
                    {!onlyRead && <Image src={icons.crossIcon} width={30} height={30} alt="cancel icon" className="cursor-pointer" onClick={() => updateFields("DELETE", "hints", index)} />}
                </li>
            ))}
        </ul>
    )
}

export default ProblemHint