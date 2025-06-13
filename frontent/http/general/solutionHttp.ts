import axios from "axios";
import { baseURL } from "..";

const solutionApi = axios.create({
    baseURL,
});

export const postUploadImage = async (payload:File):Promise<{
    path : string,
}>=>{
    try{
        const formdata = new FormData();
        formdata.append('image',payload);
        const response = await solutionApi.post("/upload-image/solutions/",formdata);
        return response.data;
    }catch(err:any){
        const error = err?.response?.data?.image?.[0] || "Failed to upload image";
        throw new Error(error);
    }
}