import axios from "axios";
import callAPI from "../config/api";
import { LoginTypes } from "./data-types";

const ROOT_API = process.env.NEXT_PUBLIC_API
const API_VERSION = `api/v1`

export async function setSignUp(data: FormData) {
    const URL = `${ROOT_API}/${API_VERSION}/auth/signup`
    return callAPI({
        url: URL,
        method: 'POST',
        data: data
    })
}

export async function setLogin(data: LoginTypes) {
    const URL = `${ROOT_API}/${API_VERSION}/auth/signin`
    
    return callAPI({
        url: URL,
        method: 'POST',
        data: data
    })
}