import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'
import Image from 'next/image'
import { icons } from "@/constants/icons"
import { Badge } from '../ui/badge'
import ProblemComments from './ProblemComments'

const ProblemMetaDetails: React.FC<{
    tags: string[],
    hints: string[]
}> = ({ hints, tags }) => {
    return (
        <div className='w-full flex flex-col'>
            <Accordion type="multiple">
                <AccordionItem value="tags">
                    <AccordionTrigger className='flex justify-between cursor-pointer'>
                        <p className='flex items-center gap-2 font-bold'>
                            <Image src={icons.tagIcons} alt='tags' width={20} height={20} />Tags
                        </p>
                    </AccordionTrigger>
                    <AccordionContent className='flex w-full gap-2 flex-wrap'>
                        {tags.map(tag => <Badge key={tag}>{tag}</Badge>)}
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="hints">
                    <AccordionTrigger className='flex justify-between cursor-pointer'>
                        <p className='flex items-center gap-2 font-bold'>
                            <Image src={icons.hintIcons} alt='tags' width={20} height={20} />Hints
                        </p>
                    </AccordionTrigger>
                    <AccordionContent>
                        <ul className='list-decimal pl-5 flex flex-col gap-3'>
                            {hints.map(hint => <li key={hint}>{hint}</li>)}
                        </ul>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="comments">
                    <AccordionTrigger className='flex justify-between cursor-pointer'>
                        <p className='flex items-center gap-2 font-bold'>
                            <Image src={icons.commentIcons} alt='tags' width={20} height={20} />Comments
                        </p>
                    </AccordionTrigger>
                    <AccordionContent className='flex w-full gap-2 flex-wrap'>
                        <ProblemComments/>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

export default ProblemMetaDetails