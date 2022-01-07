import axios, {AxiosRequestConfig} from "axios"
import {baseURL} from "../config/settings"

export const request = axios.create({
    baseURL: baseURL,
    responseType: "json",
    headers: {
        'Content-Type': 'application/json'
    }
})

export const authRequest = axios.create({
    baseURL: baseURL,
    responseType: "json"
})

authRequest.interceptors.request.use((config: AxiosRequestConfig) => {
    config.headers!.authorization = `Bearer ${localStorage.getItem('token')}`

    return config
})
