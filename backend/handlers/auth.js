import express from 'express'
import { sendRequest } from '../tools/database.js'
import { GenerateTokens, VerifyToken } from '../tools/JWT.js'

let api=express.Router()

api.post('/login',express.json(),async(req,res)=>{
    if(req.body?.pass&&req.body?.number&&req.body?.role){
        let user
        if(req.body?.role=='owner')user=await sendRequest("select * from OwnerPark where phone=$1",[req.body.number])
        else user=await sendRequest("select * from AppUser where phone=$1",[req.body.number])
        if (user?.length&&user[0].pass==req.body.pass){
            let tokens=GenerateTokens(user[0],req.body.role)
            res.json({data:tokens,error:null})
        }
        else if (user?.length)res.status(400).json({data:null,error:"Неверный пароль"})
        else res.status(404).json({data:null,error:"Аккаунт не был найден"})
    }
    else res.status(400).json({data:null,error:"Не все поля были заполнены"})
})

api.post('/register',express.json(),async(req,res)=>{
    if(req.body?.pass&&req.body?.number&&req.body?.role){
        let user
        if(req.body?.role=='owner')user=await sendRequest("select * from OwnerPark where phone=$1",[req.body.number])
        else user=await sendRequest("select * from AppUser where phone=$1",[req.body.number])
        if (user?.length)res.status(400).json({data:null,error:"К данному номеру телефона уже привязан аккаунт"})
        else {
            if(req.body?.role=='owner')await sendRequest("insert into OwnerPark(phone,pass)values($1,$2)",[req.body.number,req.body.pass])
            else await sendRequest("insert into AppUser(phone,pass)values($1,$2)",[req.body.number,req.body.pass])
            if(req.body?.role=='owner')user=await sendRequest("select * from OwnerPark where phone=$1",[req.body.number])
            else user=await sendRequest("select * from AppUser where phone=$1",[req.body.number])
            let tokens=GenerateTokens(user[0])
            res.json({data:tokens,error:null})
        }
    }
    else res.status(400).json({data:null,error:"Не все поля были заполнены"})    
})

api.post('/refresh',express.json(),async(req,res)=>{
    let authorization=req.header("Authorization")
    let header=authorization?.split(" ")
    if (header?.length&&header[1]){
        let data=VerifyToken(header[1])
        if (data.data==null)res.status(400).json({data:null,error:data.err})
        else{
            let user
            if (data.data.data?.role=='owner')user=(await sendRequest("select * from OwnerPark where id_owner=$1",[data.data.data.id_owner]))[0]
            else user=(await sendRequest("select * from AppUser where id_user=$1",[data.data.data.id_user]))[0]
            let tokens=GenerateTokens(user)
            res.json({data:tokens,error:null})
        }
    }
    else res.status(400).json({data:null,error:"Заголовок для обновления не найден"})  
})

export default api