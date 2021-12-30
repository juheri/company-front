import Axios from "axios";
import CryptoJS from 'crypto-js';

export const Login = async (data) => {
    const result = await Axios({
        method: "POST",
        url: process.env.base_url + "/login",
        headers: {
            "Authorization": process.env.bearer_token,
            "Content-Type": "application/json"
        },
        data
    })
    return result
}

export const Decrypt = async () => {
    const decrypt = CryptoJS.AES.decrypt(localStorage.getItem("_session"), process.env.secret_key)
    const result = JSON.parse(decrypt.toString(CryptoJS.enc.Utf8))
    return result
}