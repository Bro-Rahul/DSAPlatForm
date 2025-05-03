import React from 'react'
import Image from 'next/image'

const Toast:React.FC<{
    icon : any,
    success : boolean 
    text : string
}> = ({icon,success,text}) => {

    return (
        <div className={`flex items-center gap-5 p-5 ${success ? 'bg-green-700/80':'bg-red-600/85'} rounded-2xl`}>
            <Image src={icon} alt='toast icons' width={25} height={25} priority />
            <p className='font-semibold capitalize text-lg'>{text}</p>
        </div>
    )
}

export default Toast;