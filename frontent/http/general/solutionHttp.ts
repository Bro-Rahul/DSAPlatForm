import axios from "axios";
import { baseURL } from "..";
import { AvailableSolutionType, AvailableTagsType, PostSolutionType, TagAndCountType } from "@/types/solutions";

const solutionApi = axios.create({
    baseURL,
});

export const postUploadImage = async (payload: File): Promise<{
    path: string,
}> => {
    try {
        const formdata = new FormData();
        formdata.append('image', payload);
        const response = await solutionApi.post("/upload-image/solutions/", formdata);
        return response.data;
    } catch (err: any) {
        const error = err?.response?.data?.image?.[0] || "Failed to upload image";
        throw new Error(error);
    }
}

export const getProblemAvaliableSolutions = async (
    slug: string,
    tags: string[]
): Promise<AvailableSolutionType[]> => {
    try {
        const params = new URLSearchParams()
        tags.forEach(tag => params.append('tags', tag.toLowerCase()))

        const fullUrl = `/general/solution/${slug}/filter-by/?${params.toString()}`

        const response = await solutionApi.get(fullUrl)
        return response.data
    } catch (err: any) {
        const error = err?.response?.data?.detail || "Can't get the solutions"
        throw new Error(error)
    }
}


export const getProblemSolutionAvailableTags = async (slug: string): Promise<AvailableTagsType> => {
    try {
        const response = await solutionApi.get(`/general/solution/${slug}/available-solutions-tags/`)
        return response.data;
    } catch (err: any) {
        const error = err?.response?.data?.image?.[0] || "Can't get the tags";
        throw new Error(error);
    }
}


export const postSubmitSolution = async (payload:PostSolutionType,token:string):Promise<boolean> => {

    try {
        await solutionApi.post(`/general/solution/create/`,payload,{
            headers : {
                'Authorization' : `Bearer ${token}`
            }
        })
        return true;
    } catch (err: any) {
        const error = err?.response?.data?.detail || "Can't create the solutions "
        throw new Error(error)
    }
}