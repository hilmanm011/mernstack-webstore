import axios from "axios";
import callAPI from "../config/api";
import { CheckoutTypes } from "./data-types";

const ROOT_API = process.env.NEXT_PUBLIC_API
const API_VERSION = `api/v1`

export async function getFeaturedGame() {
    const URL = `players/landingpage`
    
    const response = await axios.get(`${ROOT_API}/${API_VERSION}/${URL}`)
    const axiosResponse = response.data
    return axiosResponse.data
}

export async function getDetailVoucher(id: String) {
    
    const URL = `players/detail/${id}`
    
    const response = await axios.get(`${ROOT_API}/${API_VERSION}/${URL}`)
    const axiosResponse = response.data
    return axiosResponse.data
}

export async function getGameCategory() {
    
    const URL = `players/category`

    const response = await axios.get(`${ROOT_API}/${API_VERSION}/${URL}`)
    const axiosResponse = response.data
    return axiosResponse.data
    
}

export async function setCheckout(data: CheckoutTypes) {
    const URL = `${ROOT_API}/${API_VERSION}/players/checkout`
    
    return callAPI({
        url: URL,
        method: 'POST',
        data: data,
        token: true
    })
}