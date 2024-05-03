import { BACKEND_URL } from "./helper"
import { commonfunction } from "./api"


export const registrationcall=async(data)=>{
    return await commonfunction("POST",`${BACKEND_URL}/api/v1/signup`,data)
}
export const SenOtpCall = async(data) =>{
    return await commonfunction("POST",`${BACKEND_URL}/api/v1/sendOtp`,data)
}

export const loginCall=async(data)=>{
    return await  commonfunction("POST",`${BACKEND_URL}/api/v1/user/login`,data)
}