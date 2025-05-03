import { baseUrl } from "..";
import axios from "axios";
import { ProblemList } from "@/types/problem";

const problemBaseUrl = `${baseUrl}/problems`

const problemApi = axios.create({
    baseURL : problemBaseUrl,
});


export default async function getProblemList():Promise<ProblemList[]> {
    try{
        const response = await axios.get('http://localhost:8000/v1/problems/list/get/');
        return response.data;
    }catch(err:any){
        const error = err.response.info || err.response.detaile || "Can't fetch the problem"
        throw Error(error);
    }
}