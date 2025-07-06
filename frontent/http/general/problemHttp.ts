import { ProblemCodesAndTestCaseResponseType, ProblemCommentResponseType, ProblemDescriptionResponseType, UpdateProblemResponseType } from "@/types/response";
import { generalApi } from "..";
import { ProblemList } from "@/types/problem";
import { submissionsHistoryType } from "@/types/submissions";


export async function getProblemList(): Promise<ProblemList[]> {
    try {
        const response = await generalApi.get("problems/");
        return response.data;
    } catch (err: any) {
        const error = err.response.info || err.response.detaile || "Can't fetch the problem"
        throw Error(error);
    }
}

export async function getProblem(slug: string): Promise<UpdateProblemResponseType> {
    try {
        const response = await generalApi.get(`problems/${slug}/`);
        return response.data;
    } catch (err: any) {
        const error = err.response.info || err.response.detaile || "Can't fetch the problem"
        throw Error(error);
    }
}


export async function getProblemDescription(slug: string): Promise<ProblemDescriptionResponseType> {
    try {
        const response = await generalApi.get(`problems/${slug}/description/`);
        return response.data;
    } catch (err: any) {
        const error = err.response.info || err.response.detaile || "Can't fetch the problem"
        throw Error(error);
    }
}


export async function getProblemEditorCodesAndTestCases(slug: string): Promise<ProblemCodesAndTestCaseResponseType> {
    try {
        const response = await generalApi.get(`problems/${slug}/editors-codes/`);
        return response.data;
    } catch (err: any) {
        const error = err.response.info || err.response.detaile || "Can't fetch the problem"
        throw Error(error);
    }
}

export async function getUserSubmissions(slug: string, token: string): Promise<submissionsHistoryType[]> {
    try {
        const response = await generalApi.get(`submissions-results/${slug}/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (err: any) {
        const error = err.response.info || err.response.detaile || "Can't fetch the problem"
        throw Error(error);
    }
}

export async function getProblemComments(slug: string, token?: string): Promise<ProblemCommentResponseType[]> {
    try {
        let options;
        if (token) {
            options = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        }
        const response = await generalApi.get(`problem/${slug}/comments`, options);
        return response.data;
    } catch (err: any) {
        const error = err.response.info || err.response.detaile || "Can't fetch the problem"
        throw Error(error);
    }
}