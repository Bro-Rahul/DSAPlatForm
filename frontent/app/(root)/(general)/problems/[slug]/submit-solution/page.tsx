"use client"

import { Button } from '@/components/ui/button'
import MarkdownIt from 'markdown-it';
import { Input } from '@/components/ui/input'
import MDXEditor from "@uiw/react-md-editor"
import React, { useState } from 'react'
import commandsList from '@/constants/editorComponents';
import { customAbcPlugin } from '@/util';

const SubmitSolutionPage = () => {
    const md = new MarkdownIt({ html: true });
    md.use(customAbcPlugin);
    const [value, setValue] = useState<string>(`
\`\`\`java[]
System.out.println("Hello from Java");
\`\`\`

\`\`\`cpp[]
std::cout << "Hello from C++";
\`\`\`

\`\`\`python[]
print("Hello from Python")
\`\`\`
`);
    const parse = md.parse(value, {});
    const str = md.render(value);
    const htmlFromTokens = md.renderer.render(parse, md.options, {});

    console.log(parse)
    console.log(htmlFromTokens)
    return (
        <div className='flex flex-col w-[70%] mx-auto bg-zinc-800/60 h-[100%]'>
            <div>
                <Input
                    placeholder='Enter your title'
                />
                <div>
                    <Button>Cancel</Button>
                    <Button>Submit</Button>
                </div>
            </div>
            <div className=''>
                <Button>+ Tag</Button>
            </div>

            <MDXEditor
                height={800}
                value={value}
                className='solution-mdx'
                commands={commandsList}
                onChange={e => setValue(e!)}
            />
        </div>
    )
}

export default SubmitSolutionPage