import React, { useState } from 'react'
import Editor from '@monaco-editor/react';
import LanguagePicker from './LanguagePicker';
import { LanguageSupportedType } from '@/types/store';
import useUpdateProblem from '@/store/useUpdateProblem';
import { Button } from '../ui/button';
import { patchProblem } from '@/http/admin/problemHttp';
import Toast from '../toast';
import toast from 'react-hot-toast';
import { icons } from '@/constants/icons';
import { useSession } from 'next-auth/react';


const CodeEditor: React.FC<{
    codes: LanguageSupportedType | undefined,
    slug: string
    codeType: "starter_codes" | "solution_codes"
}> = ({ codes, slug, codeType }) => {
    const [selectedLang, setSelectedLang] = useState<keyof LanguageSupportedType>('java');
    const {data} = useSession();
    const { updateProblemSingleFields, problems } = useUpdateProblem();
    const handleSubmit = async()=>{
        try{
            await patchProblem(slug,data!.user.access,{
                [codeType] : problems[slug][codeType]
            })
            toast.custom(
                <Toast
                    success
                    icon={icons.successIcon}
                    text={`${codeType} Fields Updated`}
                />,{
                    position : "bottom-right",
                    duration : 3000  
                })
        }catch(err:any){
            toast.custom(
                <Toast
                    success={false}
                    icon={icons.crossIcon}
                    text='Falied to Update Code'
                />,{
                    position : "bottom-right",
                    duration : 3000
                })
        }
    }
    
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
            <Button 
                className='save-btn'
                onClick={handleSubmit}>
                    Update Codes
            </Button>
        </section>
    )
}

export default CodeEditor