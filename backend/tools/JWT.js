import jwt from "jsonwebtoken"
import { tokens } from "../index.js"


export function GenerateTelegramToken(data){
    let token=jwt.sign(data,'s#vEltE18.',{expiresIn:"1h"})
    tokens[token.split('.')[2]]=token
    return token.split('.')[2]
}
export function GenerateTokens(data,role){
    let date_access=Math.floor(Date.now() / 1000) + (60 * 60 * 24)
    let date_refresh=Math.floor(Date.now() / 1000) + (60 * 60 * 26)
    data.role=role
    let access_token=jwt.sign({data,exp:date_access},'s#vEltE18.')
    let refresh_token=jwt.sign({data,exp:date_refresh},'s#vEltE18.')
    return {access_token,refresh_token,date_access,date_refresh}
}

export function VerifyToken(token){
    try{
        let data=jwt.verify(token,'s#vEltE18.')
        return {data,err:null}
    }catch(err){
        return {data:null,err:err.message}
    }
}