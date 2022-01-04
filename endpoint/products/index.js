import Axios from "axios";


export const createProductApi = async (data, token) => {
    const result = await Axios({
        method: "POST",
        url: process.env.base_url + "/product",
        headers: {
            "Authorization": process.env.bearer_token,
            "Content-Type": "multipart/form-data",
            token
        },
        data
    });
    return result
}

export const getProduct = async (token, page) => {
    const result = await Axios({
        method: "GET",
        url: process.env.base_url + "/product-company?page="+page+"&per_page=10",
        headers: {
            "Authorization": process.env.bearer_token,
            "Content-Type": "multipart/form-data",
            token
        }
    });
    return result
}