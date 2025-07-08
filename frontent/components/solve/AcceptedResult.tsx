import { useSession } from "next-auth/react"
import Image from "next/image"
import { Button } from "../ui/button"
import { icons } from "@/constants/icons"
import useProblem from "@/store/useProblem"
import { Editor } from '@monaco-editor/react'
import { getFormatedDateString } from "@/util"
import Link from "next/link"
import { useParams } from "next/navigation"

const AcceptedResult = () => {
    const session = useSession();
    const { data:{submissionResult} } = useProblem();
    const {slug} = useParams<{slug:string}>();
    const { data: userData } = session;

    const formatedDate = getFormatedDateString(submissionResult?.payload.dateTimestr!);

    return (
        <div className='flex flex-col w-full px-25 gap-5'>
            <div className='flex justify-between items-center gap-5'>
                <div>
                    <p className='font-normal text-xl text-[rgba(22,163,74,1)]'>Accepted <span className='text-sm font-bold text-gray-500 '>{submissionResult?.payload.totalPassed} testcases passed</span></p>
                    <div className='flex justify-center items-center gap-2'>
                        <Image
                            src={session?.data?.user.image || icons.dummyProfileIcon}
                            alt='profile icon'
                            width={25}
                            height={25}
                            className='rounded-full'
                        />
                        <span className='text-sm font-light'>{userData?.user.username} submitted at {formatedDate}</span>
                    </div>
                </div>
                <Link href={`/submit-solution/${submissionResult?.payload.id}/`}>
                    <Button className='cursor-pointer text-white bg-green-700 hover:bg-green-800'>
                    <Image src={icons.editorailIcon} alt='editorail' width={20} height={20} />
                    Share
                </Button>
                </Link>
            </div>
            <div>
                <p className='font-normal text-zinc-400 capitalize'>Code : {submissionResult?.payload.lang}</p>
                <Editor
                    language={submissionResult?.payload.lang}
                    value={submissionResult?.payload.code}
                    height={400}
                    className="w-full"
                    theme="vs-dark"
                    options={{
                        readOnly: true,
                        minimap : {
                            enabled : false
                        },
                        domReadOnly : true,
                        folding : false,
                        wordWrap: "on",
                    }}
                />
            </div>
        </div>
    )
}

export default AcceptedResult;