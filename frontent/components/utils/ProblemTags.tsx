import React from 'react'
import Image from 'next/image'
import { icons } from '@/constants/icons'
import { Operations } from '@/store/useSetProblem'
import { Badge } from '../ui/badge'
import { Input } from '../ui/input'


const ProblemTags:React.FC<{
    values : string[],
    onlyRead? : boolean,
    updateFields: (operation: Operations, on:"hints"|"tags", index?: number, value?: string) => void
}> = ({updateFields,values,onlyRead}) => {
    return (
        <ul className={`flex ${!onlyRead ? 'flex-col' : 'flex-row'} w-full gap-3 flex-wrap ml-2`}>
            {values.map((tag, index) => (
                <li className="flex items-center w-fit gap-2 bg-gray-100 px-3 py-1 rounded-full" key={index} >
                    <Badge className="text-md font-semibold bg-transparent">
                        {!onlyRead ? <Input value={tag} onChange={val =>updateFields("UPDATE","tags",index,val.target.value)}/> : tag}
                    </Badge>
                    {!onlyRead && <Image src={icons.crossIcon} width={20} height={20} alt="cancel icon" className="cursor-pointer" onClick={() =>updateFields("DELETE","tags",index)} />}
                </li>
            ))}
        </ul>
    )
}

export default ProblemTags