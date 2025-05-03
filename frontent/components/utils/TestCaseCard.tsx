import React from 'react'
import { Input } from '../ui/input';
import Image from 'next/image';
import { icons } from '@/constants/icons';
import { ParameterType, TestCase } from '@/types/store';


const TestCaseCard: React.FC<{
    inputParameters : ParameterType[]
    testcases : TestCase[],
    onChange: (index: number, field: string, value: string) => void;
    onRemoveParameter : (field:string)=>void
}> = ({inputParameters,testcases,onChange,onRemoveParameter}) => {

    return (
        <>
            {testcases && testcases.map((testcase, index) => (
                <div className='bg-zinc-800 p-2 rounded-lg gap-3 flex flex-col w-full' key={index}>
                    <h3 className='text-center border-b-2 border-white p-1 rounded-md font-bold'>Test Case 1</h3>
                    <ul className='flex flex-col list-none w-full gap-3'>
                        {inputParameters && inputParameters.map((items, i) => (
                            <li className='flex items-center w-full gap-3' key={`1${i}`}>
                                <Image alt='cross-icon' src={icons.crossIcon} width={22} height={22} className='cursor-pointer' onClick={()=>onRemoveParameter(items.parameterName)}/>
                                <p className='min-w-max inline-flex flex-col'>{items.parameterName} = <span className='text-zinc-400 text-sm'>({items.parameterType})</span></p>
                                <Input value={testcase[items.parameterName]||''} onChange={e=>onChange(index,items.parameterName,e.target.value)} type='text' />
                            </li>
                        ))}
                    </ul>
                    <output className='flex items-center gap-3'><span className='min-w-max'>Expected Output =</span> <Input value={testcase.expectedOutput||''} onChange={e=>onChange(index,"expectedOutput",e.target.value)} type='text' /></output>
                </div>
            ))}
        </>
    )
}

export default TestCaseCard

/*
<div className='bg-zinc-800 p-2 rounded-lg gap-3 flex flex-col w-full'>
<h3 className='text-center border-b-2 border-white p-1 rounded-md font-bold'>Test Case 2</h3>
<ul className='flex flex-col w-full gap-3'>
     {inputParams.map((items, i) => (
                <li className='flex items-center w-full gap-3' key={`1${i}`}>
                    <RxCross2 onClick={(e) => dispatch(removeParameter(items.parameterName))} className='cursor-pointer' />
                    <p className='min-w-max inline-flex flex-col'>{items.parameterName} = <span className='text-zinc-400 text-sm'>({items.parameterType})</span></p>
                    <Input defaultValue={''} type='text' onChange={(e) => { dispatch(addParameterValue({ index: 1, parameterName: items.parameterName, value: e.target.value })) }} />
                </li>
            ))} 
</ul>
<output className='flex gap-3 items-center'><span className='min-w-max'>Expected Output =</span> <Input type='text' defaultValue={''} onChange={(e) => { dispatch(addExpectedOutput({ index: 1, output: e.target.value })) }} /></output>
        <p className='flex gap-2 items-center'>Explanation <Input defaultValue={''} type='text' onChange={(e) => dispatch(addExplanationForOutput({ index: 1, explanation: e.target.value }))} /></p> 
</div>

*/