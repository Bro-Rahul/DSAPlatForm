import React, { useState } from 'react'
import Editor from '@monaco-editor/react';
import LanguagePicker from './LanguagePicker';
import { LanguageSupportedType } from '@/types/store';
import useUpdateProblem from '@/store/useUpdateProblem';
import { Button } from '../ui/button';


const CodeEditor: React.FC<{
    codes: LanguageSupportedType | undefined,
    slug: string
    codeType: "starter_codes" | "solution_codes"
}> = ({ codes, slug, codeType }) => {
    const [selectedLang, setSelectedLang] = useState<keyof LanguageSupportedType>('java');
    const { updateProblemSingleFields, problems } = useUpdateProblem();
    return (
        <section className='flex flex-col gap-2 overflow-hidden relative'>
            <LanguagePicker value={selectedLang} onValueChange={(e) => setSelectedLang(e as keyof LanguageSupportedType)} />
            <Editor
                className='overflow-hidden h-screen'
                theme='vs-dark'
                onChange={e => updateProblemSingleFields(slug, {
                    [codeType]: {
                        ...problems[slug][codeType],
                        [selectedLang]: e
                    }
                })}
                language={selectedLang}
                value={problems[slug][codeType][selectedLang]}
            />
            <Button className='absolute bottom-1 w-full'>Update Problem</Button>
        </section>
    )
}

export default CodeEditor