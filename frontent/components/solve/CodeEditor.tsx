import { Editor } from '@monaco-editor/react'
import React, { useState } from 'react'
import LanguagePicker from '../editor/LanguagePicker'
import useSandBox from '@/store/useSandBox'
import { LanguageSupportedType } from '@/types/store'
import Image from 'next/image'
import { icons } from '@/constants/icons'

const CodeEditor: React.FC<{
    slug: string
}> = ({ slug }) => {
    const { config, updateCodes } = useSandBox();
    const [selectedLang, setSelectedLang] = useState<keyof LanguageSupportedType>("cpp");
    return (
        <div className='flex flex-col w-full h-1/2'>
            <div className='flex justify-between items-center w-full p-2'>
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