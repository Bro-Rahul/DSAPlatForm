import { LanguageSupportedType } from "@/types/store";
import { generalApi } from "..";
import { SubmitResponseType } from "@/types/httpTypes";
import { submissionsHistoryType } from "@/types/submissions";

type RunCodeType = {
    lang : keyof LanguageSupportedType,
    code : string,
    testcases : string 
}

type SubmitCodeType = {
    lang : keyof LanguageSupportedType,
    code : string,
}

export async function postRunCode(slug:string,payload:RunCodeType) {
    try{
        const response = await generalApi.post(`submissions/${slug}/run-code/`,payload);
        return response.data
    }catch(err:any){
        const error = err.response.data.info[0] || err.message
        throw Error(error);
    }

}

export async function postSubmitCode(slug:string,token:string,payload:SubmitCodeType):Promise<SubmitResponseType> {
    try{
        const response = await generalApi.post(`submissions/${slug}/submit-code/`,payload,{
            headers :{
                Authorization : `Bearer ${token}`
            }
        });
        return response.data
    }catch(err:any){
        const error = err.response.data.info[0] || err.message
        throw Error(error);
    }
}

export async function getUserSubmissions(slug:string,token:string):Promise<submissionsHistoryType[]> {
    try{
        const response = await generalApi.get(`submissions-results/${slug}`,{
            headers : {
                Authorization : `Bearer ${token}`
            }
        })
        return response.data;
    }catch(err:any){
        const error = err.response.data.detail || err.info || err.message
        throw Error(error);
    }
}