import axios, { AxiosResponse } from "axios";

export const fetchCartItems = (uid: any): any => {
    const res = axios({
        url: `http://localhost:3000/user/${uid}/cart/`,
        method: 'GET'
    })
    return res
}