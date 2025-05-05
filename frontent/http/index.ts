import axios from "axios"

export const baseURL = "http://localhost:8000/v1"

export const adminApi = axios.create({
    baseURL : `${baseURL}/admin/`
});

export const generalApi = axios.create({
    baseURL : `${baseURL}/general/`
});