import express from 'express'
import { sendRequest } from '../tools/database.js'
import { GenerateTelegramToken } from '../tools/JWT.js'

let api=express.Router()

api.get('/cars',async(req,res)=>{
    if(req.body?.role=='user'){
        let cars=await sendRequest("select * from Car where id_user=$1",[req.body.id_user])
        if(cars?.length)res.json({data:cars,error:null})
        else res.status(404).json({data:null,error:"У вас нет машин"})
    }
    else {
        let cars=await sendRequest("select * from Car")
        if(cars?.length)res.json({data:cars,error:null})
        else res.status(404).json({data:null,error:"Пока машин не зарегестрировано"})
    }
})
api.post('/addcar',(req,res,next)=>{
    req.myBody=req.body
    return next()
},express.json(),async(req,res)=>{
    if(req?.myBody?.role=='user'){
        if(req.body?.gos_nomer){
            let car=await sendRequest("select * from Car where id_gos_nomer=$1",[req.body?.gos_nomer])
            if(car?.length)res.status(400).json({data:null,error:"С таким гос.номером амтомобиль уже существует"})
            else {
                await sendRequest("insert into Car(id_gos_nomer,id_user)values($1,$2)",[req.body.gos_nomer,req?.myBody?.id_user])
                res.json({data:"Автомобиль зарегестрирован!",error:null})
            }
        }
        else res.status(400).json({data:null,error:"Не было передано гос. номера автомобиля"})
    }
    else res.status(401).json({data:null,error:"Владелец парковки не может добавлять автомобили"})
})

api.post('/bindTelegram',async(req,res)=>{
    let data={role:req.body?.role,id:req.body?.role=='user'?req.body.id_user:req.body?.id_owner}
    let token=GenerateTelegramToken(data)
    res.json({data:`https://t.me/fasparkbot?start=${token}`,error:null})
})

export default api