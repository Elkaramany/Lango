import axios from 'axios'
import { URL } from '@env'

const AXIOS = async (method: string, url: string, data?: any) => {
    try {
        //@ts-ignore
        const res = await axios({
            method: method,
            url: `${URL}${url}`,
            data,
        })
        return { success: true, data: res?.data || null }
    } catch (e: any) {
        return { success: false, data: e?.response?.data || "Please check your internet connection" }
    }
}

export const POST = async (url: string, data?: any) => {
    return AXIOS("post", url, data)
}

export const GET = async (url: string, data?: any) => {
    return AXIOS("get", url, data)
}

export const PATCH = async (url: string, data?: any) => {
    return AXIOS("patch", url, data)
}