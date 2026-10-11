import React, { useState } from 'react'
import { Button } from '../ui/button'
import { postSubmitCode } from '@/http/general/submissionHttp';
import { LanguageSupportedType } from '@/types/store';
import Lottie from "lottie-react";
import useSandBox from '@/store/useSandBox';
import animationData from "@/public/animations/loading.json";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import useProblem from '@/store/useProblem';
import toast from 'react-hot-toast';
import Toast from '../toast';
import { icons } from '@/constants/icons';


const SubmitCodeButton: React.FC<{
    slug: string,
    selectedLang: keyof LanguageSupportedType,

}> = ({ selectedLang, slug }) => {
    const {displaySubmitResults} = useProblem();
    const { config } = useSandBox();
    const [loading, setLoading] = useState<boolean>(false);
    const {data} = useSession();
    const router = useRouter();


    const handleSubmitCode = async () => {
        if(!data?.user.access){
            router.push("/auth/login");
        }
        try {
            setLoading(true);
            const response = await postSubmitCode(slug,data!.user.access ,{
                code: config[slug].starterCode[selectedLang],
                lang: selectedLang,
            }); 
            displaySubmitResults(response.status,{
                id :response.id,
                dateTimestr : response.dateTimestr,
                outputs : response.output,
                testcase : response.testcase,
                totalPassed : response.testcasePassed,
                timeOut : response.timeOut,
                timeOutAt : response.timeOutAt,
                error : response.errors,
                executionError : response.executionError,
                code : config[slug].starterCode[selectedLang],
                lang : selectedLang,
            }); 
            router.push(`/problems/${slug}/result`);
        } catch (err:any) {
            toast.custom(<Toast
                icon={icons.errorIcon}
                success={false}
                text={err.message}
            />,{
                position : 'bottom-right',
                duration: 3000,

            })
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
                    onClick={handleSubmitCode}
                >Submit</Button>
            )}
        </>
    )
}

export default SubmitCodeButton