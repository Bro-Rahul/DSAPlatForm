import { adminApi } from "..";
import { ProblemList, ProblemSolveType } from "@/types/problem";
import { UpdateProblemResponseType } from "@/types/response";
import { UpdateProblemType } from "@/types/store";


export async function getProblemList(token: string): Promise<ProblemList[]> {
    try {
        const response = await adminApi.get('problems/', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (err: any) {
        const error = err.response.info || err.response.detaile || "Can't fetch the problem"
        throw Error(error);
    }
}

export async function getProblem(slug: string): Promise<UpdateProblemResponseType> {
    try {
        const response = await adminApi.get(`problems/${slug}`);
        return response.data;
    } catch (err: any) {
        const error = err.response?.data?.info || err.response?.data?.detail || err?.message || "Can't fetch the problems!"
        throw Error(error);
    }
}


export async function patchProblem(slug: string, token: string, payload: Partial<UpdateProblemType>) {
    let body: any;
    if (payload.difficulty) {
        const { difficulty, ...rest } = payload
        body = {
            ...rest,
            level: difficulty
        }
    } else {
        body = {
            ...payload
        }
    }

    try {
        const response = await adminApi.patch(`problems/${slug}/update/`, body, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error: any) {
        const err = error.response.data.info || error.message || "Can't upadte the problem"
        throw Error(err)
    }
}