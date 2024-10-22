import axios from "axios"
const backendUrl = import.meta.env.VITE_BACKEND_URL;


export const axiosObj = axios.create({
    baseURL : backendUrl
})
