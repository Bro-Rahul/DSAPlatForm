import { SetProblemType, UpdateProblemType } from "@/types/store";
import { baseUrl } from ".";
import axios from "axios";
import { ProblemList } from "@/types/problem";
import { formateSetProblemBodyData } from "@/lib/utils";
import { UpdateProblemResponseType } from "@/types/response";

const problemBaseUrl = `${baseUrl}/problems`

const problemApi = axios.create({
    baseURL : problemBaseUrl,
});

export async function createProblemPOST(payload:SetProblemType,userId:number,accessToken:string) {
    let body = {
        ...formateSetProblemBodyData(payload),
        user : userId
    }
    try{
        const response = await problemApi.post('/create/',JSON.stringify(body),{
            headers : {
                "Content-Type":"application/json",
                Authorization : `Bearer ${accessToken}`
            }
        });
        return response.data;
    }catch(err:any){
        const error = err.response.data.info || err.response.data.detail || err.message||"Can't create problem !"
        throw Error(error);
    }
}

export async function getProblemList(accessToken:string):Promise<ProblemList[]>{
    try{
        const response = await problemApi.get("/",{
            headers : {
                Authorization : `Bearer ${accessToken}`
            }
        });
        return response.data;
    }catch(err:any){
        const error = err.response.data.info || err.response.data.detail || err.message||"Can't fetch the problems!"
        throw Error(error);
    }
}

export async function getProblem(slug:string):Promise<UpdateProblemResponseType>{
    try{
        const response = await problemApi.get(`/${slug}`);
        return response.data;
    }catch(err:any){
        const error = err.response?.data?.info || err.response?.data?.detail || err?.message||"Can't fetch the problems!"
        throw Error(error);
    }
}