import axios from "axios"

export const baseURL = "http://localhost:8000/v1"
export const assetsURL = "http://127.0.0.1:8000/v1/assets"

export const adminApi = axios.create({
    baseURL : `${baseURL}/admin/`
});

export const generalApi = axios.create({
    baseURL : `${baseURL}/general/`
});