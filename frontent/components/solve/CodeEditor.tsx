import { Editor } from '@monaco-editor/react'
import React, { useState } from 'react'
import LanguagePicker from '../editor/LanguagePicker'
import useSandBox from '@/store/useSandBox'
import { LanguageSupportedType } from '@/types/store'
import Image from 'next/image'
import { postRunCode,postSubmitCode } from '@/http/general/submissionHttp'
import { icons } from '@/constants/icons'
import { Button } from '../ui/button'
import useTestCaseProvider from '@/hook/useTestCaseProvider'

const CodeEditor: React.FC<{
    slug: string
}> = ({ slug }) => {
    const { config, updateCodes } = useSandBox();
    const {getEncodedTestCases,updateTestCaseResults} = useTestCaseProvider();
    const [selectedLang, setSelectedLang] = useState<keyof LanguageSupportedType>("java");
    const handleRunCode = async()=>{
        try{
            const response = await postRunCode(slug,{
                code:config[slug].starterCode[selectedLang],
                lang:selectedLang,
                testcases:getEncodedTestCases()
            });
            updateTestCaseResults(response);
        }catch(err){
            console.log(err);
        }
    }
    
    return (
        <div className='flex flex-col w-full h-1/2'>
            <div className='flex justify-between items-center gap-2 w-full p-2'>
                <LanguagePicker
                    onValueChange={e => setSelectedLang(e as keyof LanguageSupportedType)}
                    value={selectedLang}
                />
                <div className='flex w-full justify-end gap-3'>
                    <Image
                        src={icons.resetIcon}
                        alt='Reset the editor'
                        width={18}
                        height={18}
                    />
                    <Image
                        src={icons.settingIcon}
                        alt='Reset the editor'
                        width={18}
                        height={18}
                    />
                </div>
                <div className='flex gap-1'>
                    <Button onClick={handleRunCode}>Run</Button>
                    <Button>Submit</Button>
                </div>
            </div>
            <Editor
                className='overflow-hidden'
                height={'100%'}
                theme='vs-dark'
                language={selectedLang}
                value={config?.[slug]?.starterCode?.[selectedLang] || ''}
                onChange={e => updateCodes(slug, selectedLang, e!)}
            />
        </div>
    )
}

export default CodeEditor