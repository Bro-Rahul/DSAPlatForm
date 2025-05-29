import React, { useState } from 'react'
import { Button } from '../ui/button'
import { postRunCode } from '@/http/general/submissionHttp';
import { LanguageSupportedType } from '@/types/store';
import Lottie from "lottie-react";
import useSandBox from '@/store/useSandBox';
import useTestCaseProvider from '@/hook/useTestCaseProvider';
import animationData from "@/public/animations/loading.json";


const RunCodeButton: React.FC<{
    slug: string,
    selectedLang: keyof LanguageSupportedType,

}> = ({ selectedLang, slug }) => {
    const { getEncodedTestCases, updateTestCaseResults, handleToggle } = useTestCaseProvider();
    const { config } = useSandBox();
    const [loading, setLoading] = useState<boolean>(false);

    const handleRunCode = async () => {
        try {
            setLoading(true);
            const response = await postRunCode(slug, {
                code: config[slug].starterCode[selectedLang],
                lang: selectedLang,
                testcases: getEncodedTestCases()
            });
            handleToggle("testresult")
            updateTestCaseResults(response);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }
    return (
        <>
            {loading ? (
                <Lottie animationData={animationData} className='bg-white w-15 h-10 rounded-xl' loop={true} />
            ) : (
                <Button
                    onClick={handleRunCode}
                >Run</Button>
            )}
        </>
    )
}

export default RunCodeButton