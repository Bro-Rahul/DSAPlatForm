import { LoginForm, RegisterForm, SocialLoginType } from "@/types/form";
import { baseUrl } from ".";
import axios from "axios";

const userBaseUrl = `${baseUrl}/users`

export async function loginUser(payload: LoginForm) {
    try {
        const response = await axios.post(`${userBaseUrl}/auth/login`, JSON.stringify(payload), {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (err: any) {
        const error = err.response.data.detail || err.message
        throw new Error(error);
    }
}


export async function socialLogin(payload:SocialLoginType,provider:"google"|"github") {
    try{
        const response = await axios.post(`${userBaseUrl}/auth/login-with/${provider}/`, JSON.stringify(payload), {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    }catch (err: any) {
        const error = err.response.data.detail || err.message || "Login Faile"
        throw new Error(error);
    }
}

export async function registerUser(payload: RegisterForm) {
    try {
        const response = await axios.post(`${userBaseUrl}/auth/register/`, JSON.stringify(payload), {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (err: any) {
        const error = err.response.data.info || err.message
        throw new Error(error);
    }
}