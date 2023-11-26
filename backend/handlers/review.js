import express from 'express'
import { sendRequest } from '../tools/database.js'

let api=express.Router()

api.post('/getall',(req,res,next)=>{
    req.myBody=req.body
    return next()
},express.json(),async(req,res)=>{
    if (req.body?.parking){
        //Получение всех отзывов о парковке
        let reviews=await sendRequest("select * from Review where id_parking=$1",[req.body?.parking])
        if(reviews?.length)res.json({data:reviews,error:null})
        else res.status(404).json({data:null,error:"О парковке не было оставлено отзывов"})
    }
    else if(req.myBody?.role=='user'){
        //Получение всех отзывов от пользователя
        let reviews=await sendRequest("select * from Review where id_user=$1",[req.myBody?.id_user])
        if(reviews?.length)res.json({data:reviews,error:null})
        else res.status(404).json({data:null,error:"Вы не оставляли отзывов"})
    }
    else {
        //Получение всех отзывов о всех парковках владельца
        let reviews=await sendRequest("select Review.* from Review join Parking on Review.id_parking=Parking.id_parking join OwnerPark on Parking.id_owner=OwnerPark.id_owner where OwnerPark.id_owner=$1",[req.myBody?.id_owner])
        if(reviews?.length)res.json({data:reviews,error:null})
        else res.status(404).json({data:null,error:"О ваших парковках не было оставлено отзывов"})
    }
})

api.post('/',(req,res,next)=>{
    req.myBody=req.body
    return next()
},express.json(),async(req,res)=>{
    if(req?.myBody?.role=='user'){
        if(req.body?.id_parking){
            let parking=await sendRequest("select * from Parking where id_parking=$1",[req.body?.id_parking])
            if(parking?.length){
                await sendRequest('insert into Review(description,rate,id_parking,id_user)values($1,$2,$3,$4)',[req.body?.description?req.body?.description:'',req.body?.rate?req.body?.rate:1,req.body?.id_parking,req?.myBody?.id_user])
                res.json({data:"Отзыв сохранен",error:null})
            }
            else res.status(404).json({data:null,error:"Не было найдено парковки"})
        }
        else res.status(400).json({data:null,error:"Не было передано идентификатора парковки"})
    }
    else res.status(400).json({data:null,error:"Только пользователь может оставлять отзывы"})
})


export default api