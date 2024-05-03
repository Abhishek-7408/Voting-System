import axios from "axios"

export const commonfunction=async(methods,url,body,header)=>{
    let config={
        method:methods,
        url,
        header:header?header:{"Content-Type":"text/plain"},
        data:body
    }


    return axios(config).then((data)=>{
        return data
    }).catch((error)=>{
        return error
    })



}