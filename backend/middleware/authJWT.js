import { VerifyToken } from "../tools/JWT.js"

export function JWTmiddleware(req,res,Next){
    let authorization=req.header("Authorization")
    let header=authorization?.split(" ")
    if (header?.length&&header[1]){
        let data=VerifyToken(header[1])
        if (data.data==null)res.status(403).json({data:null,error:data.err})
        else{
            req.body=data.data.data
            return Next()
        }
    }
    else res.status(403).json({data:null,error:"Заголовок не был найден"})
}