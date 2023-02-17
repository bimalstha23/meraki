import axios, { AxiosResponse } from "axios"

export const fetchCategories = (): Promise<AxiosResponse<any, any>> => {
    const res = axios({
        url: "http://localhost:3000/categories",
        method: 'GET'
    })
    return res
}
