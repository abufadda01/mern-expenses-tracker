import {axiosObj} from "../../utils/axiosObj"
import {loginAction} from "../../redux/slices/authSlice"


export const loginAPI = async ({email , password}) => { // we send object and we destructure it directly when its recived
    const resposne = await axiosObj.post(`/users/login` , {email , password})
    return resposne.data
}


export const registerAPI = async ({username , email , password}) => { // we send object and we destructure it directly when its recived
    const resposne = await axiosObj.post(`/users/register` , {username , email , password})
    return resposne.data
}