import { PatchProblemCommentPayloadType, PostProblemCommentPayloadType } from "@/types/httpTypes";
import { generalApi } from "..";
import { ProblemCommentResponseType } from "@/types/response";



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
        const error = err.response.info || err.response.detail || "Can't fetch the problem"
        throw Error(error);
    }
}


export async function getProblemCommentSubComments(slug: string,commentId:number, token?: string): Promise<ProblemCommentResponseType[]> {
    try {
        let options;
        if (token) {
            options = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        }
        const response = await generalApi.get(`problem/${slug}/comments/${commentId}/subcomments/`, options);
        return response.data;
    } catch (err: any) {
        const error = err.response.info || err.response.detail || "Can't fetch the problem"
        throw Error(error);
    }
}



export const postProblemComment = async (payload: PostProblemCommentPayloadType, token: string): Promise<ProblemCommentResponseType> => {
    try {
        const response = await generalApi.post('comments/', payload, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (err: any) {
        const error = err.response.info || err.response.detail || "Can't Post the comment"
        throw Error(error);
    }
}

export const deleteProblemComment = async (commentId: number, token: string): Promise<true> => {
    try {
        await generalApi.delete(`comments/${commentId}/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return true;
    } catch (err: any) {
        const error = err.response.info || err.response.detail || "Can't fetch the problem"
        throw Error(error);
    }
}

export const patchProblemComment = async (payload: PatchProblemCommentPayloadType, commentId: number, token: string): Promise<true> => {
    try {
        await generalApi.patch(`comments/${commentId}/`, payload, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return true;
    } catch (err: any) {
        const error = err.response.info || err.response.detail || "Can't fetch the problem"
        throw Error(error);
    }
}


export const postProblemCommentLike = async (commentId: number, token: string): Promise<true> => {
    try {
        await generalApi.post(`comment/vote/${commentId}/like/`, null, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return true;
    } catch (err: any) {
        const error = err.response.info || err.response.detail || "Can't fetch the problem"
        throw Error(error);
    }
}


export const postProblemCommentDisLike = async (commentId: number, token: string): Promise<true> => {
    try {
        await generalApi.post(`comment/vote/${commentId}/dislike/`, null, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return true;
    } catch (err: any) {
        const error = err.response.info || err.response.detail || "Can't fetch the problem"
        throw Error(error);
    }
}


export const postProblemCommentReply = async (commentId: number, replyComment: string, token: string) => {
    try {
        const body = {
            comment: replyComment
        }
        await generalApi.post(`comments/${commentId}/subcomment/`, body, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return true;
    } catch (err: any) {
        console.log(err)
        const error = err.response.info || err.response.detail || "Can't fetch the problem"
        throw Error(error);
    }
}