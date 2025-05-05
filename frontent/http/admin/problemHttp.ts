import { UpdateProblemResponseType } from "@/types/response";
import { adminApi } from "..";
import { ProblemList, ProblemSolveType } from "@/types/problem";


export async function getProblemList(token:string):Promise<ProblemList[]> {
    try{
        const response = await adminApi.get('problems/',{
            headers : {
                Authorization : `Bearer ${token}`
            }
        });
        return response.data;
    }catch(err:any){
        const error = err.response.info || err.response.detaile || "Can't fetch the problem"
        throw Error(error);
    }
}

export async function getProblem(slug:string):Promise<ProblemSolveType> {
    try{
        const response = await adminApi.get(`problems/${slug}`);
        return response.data;
    }catch(err:any){
        const error = err.response.info || err.response.detaile || "Can't fetch the problem"
        throw Error(error);
    }
}