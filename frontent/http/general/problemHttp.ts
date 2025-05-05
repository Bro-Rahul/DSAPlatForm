import { UpdateProblemResponseType } from "@/types/response";
import { generalApi } from "..";
import { ProblemList } from "@/types/problem";


export async function getProblemList():Promise<ProblemList[]> {
    try{
        const response = await generalApi.get("problems/");
        return response.data;
    }catch(err:any){
        const error = err.response.info || err.response.detaile || "Can't fetch the problem"
        throw Error(error);
    }
}

export async function getProblem(slug:string):Promise<UpdateProblemResponseType> {
    try{
        const response = await generalApi.get(`problems/${slug}`);
        return response.data;
    }catch(err:any){
        const error = err.response.info || err.response.detaile || "Can't fetch the problem"
        throw Error(error);
    }
}