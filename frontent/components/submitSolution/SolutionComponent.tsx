"use client"

import { Button } from '@/components/ui/button'
import MarkdownIt from 'markdown-it';
import { Input } from '@/components/ui/input'
import MDXEditor from "@uiw/react-md-editor"
import React, { useState } from 'react'
import commandsList from '@/constants/editorComponents';
import { customAbcPlugin } from '@/util';
import { SubmissionsHistoryType } from '@/types/submissions';
import CodeHighlight from './CodeHighlight';

const SolutionComponent:React.FC<{
    submissionData : SubmissionsHistoryType
}> = ({submissionData}) => {
    const md = new MarkdownIt({ html: true });
    md.use(customAbcPlugin);
    const [value, setValue] = useState<string>(submissionData.submission_code);
    const parse = md.parse(value, {});
    const str = md.render(value);

    return (
        <div className='flex flex-col w-[70%] mx-auto mt-5 bg-zinc-800/60 h-[100%]'>
            <div>
                <Input
                    placeholder='Enter your title for Solution'
                />
                <div className='flex flex-row gap-2 justify-end'>
                    <Button>Submit</Button>
                    <Button>Cancel</Button>
                </div>
            </div>
            <div className='flex flex-row gap-2'>
                <Button>+ Tag</Button>
            </div>
            <CodeHighlight code={submissionData.submission_code}/>

            {/* <MDXEditor
                height={800}
                value={value}
                className='solution-mdx'
                commands={commandsList}
                onChange={e => setValue(e!)}
            /> */}
        </div>
    )
}

export default SolutionComponent