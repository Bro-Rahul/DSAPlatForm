
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import AcceptedCard from "./AcceptedCard";
import RejectedCard from "./RejectCard";
import React from "react";
import { submissionsHistoryType } from "@/types/submissions";


const AllSubmissions:React.FC<{
    isLogin : boolean,
    isLoading : boolean,
    error : Error,
    submissionHistory : submissionsHistoryType[]|undefined
}> = ({isLogin,submissionHistory,error,isLoading}) => {
    const router = useRouter();
    let content;
    if (!isLogin) {
        content = <div>
            Login to get the submissions Records!
            <Button
                onClick={() => router.push("/auth/login")}
            >Login</Button>
        </div>
    } else if (!error && !isLoading) {
        content = submissionHistory?.map((history, index) => (
            history.status === "accepted" ? <AcceptedCard result={history} key={index} /> : <RejectedCard result={history} key={index} />
        ))
    }
    return (
        <div className='flex flex-col w-full bg-zinc-800 h-[100%]'>
            {content}
        </div>
    )
}


export default AllSubmissions;