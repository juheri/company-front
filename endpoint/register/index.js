import Axios from "axios";

export const register = async (data) => {
    const result = await Axios({
        method: "POST",
        url: process.env.base_url + "/register",
        headers: {
            "Authorization": process.env.bearer_token,
            "Content-Type": "application/json"
        },
        data
    })
    return result
}