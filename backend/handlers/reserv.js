import express from 'express'
import { sendRequest } from '../tools/database.js'
import { SendNotice } from '../bot/Createbot.js'
import { bot } from '../index.js'
import multer from 'multer'
import { createHash } from 'crypto'

let api=express.Router()

api.post('/getParkings',express.json(),async(req,res)=>{
    if(req.body?.lat&&req.body?.long&&req.body?.range){
        let lat=Number(req.body.lat)
        let long=Number(req.body.long)
        let range=Number(req.body.range)
        let parkings=await sendRequest(`select Parking.*,Type_parking.title as type_title, (select count(*) from Spot where id_parking=Parking.id_parking) as spots from Parking join Type_parking on Parking.id_type=Type_parking.id_type where ST_DWithin(location::geography,st_setsrid(ST_MakePoint(${lat},${long}),4326)::geography,${range})`)
        for(let i=0;i<parkings?.length;i++){
            parkings[i].cheapSpot=(await sendRequest("select min(value) from Price where id_parking=$1",[parkings[i].id_parking]))[0].min
        }
        if(parkings?.length)res.json({data:parkings,error:null})
        else res.status(404).json({data:null,error:"Ближайших парковок не было найдено"})
    }
    else res.status(400).json({data:null,error:"Не все параметры были переданы"})
})

api.post('/getParking',express.json(),async(req,res)=>{
    if(req.body?.id_parking){
        let parking=await sendRequest("select Parking.*,Type_parking.title as type_title from Parking join Type_parking on Parking.id_type=Type_parking.id_type where id_parking=$1",[req?.body?.id_parking])
        if(parking?.length){
            let allSpots=(await sendRequest("select count(*) from Spot where id_parking=$1",[req?.body?.id_parking]))[0].count
            let freeSpots=(await sendRequest("select count(*) from Spot where id_parking=$1 and is_available=$2",[req?.body?.id_parking,true]))[0].count
            let hours_work=await sendRequest("select * from HoursWork where id_parking=$1",[req?.body?.id_parking])
            parking[0].allSpots=allSpots
            parking[0].freeSpots=freeSpots
            parking[0].hours_work=hours_work
            res.json({data:parking,error:null})
        }
        else res.status(404).json({data:null,error:"Ближайших парковок не было найдено"})
    }
    else if(req?.body?.match){
        let mathces=await sendRequest(`select Parking.id_parking,Parking.title,Parking.address from Parking where title like '%${req.body.match}%' or address like '%${req.body.match}%'`)
        if(mathces?.length)res.json({data:mathces,error:null})
        else res.status(404).json({data:null,error:"Не найдено совпадений"})
    }
    else res.status(400).json({data:null,error:"Не все параметры были переданы"})
})

api.post('/getSpots',express.json(),async(req,res)=>{
    if(req.body?.id_parking){
        let spots=await sendRequest("select * from Spot where id_parking=$1",[req.body.id_parking])
        if(spots?.length)res.json({data:spots,error:null})
        else res.status(404).json({data:null,error:"У парковки нет мест"})
    }
    else res.status(400).json({data:null,error:"Не все параметры были переданы"})
})

api.post('/getPrices',(req,res,next)=>{
    req.myBody=req.body
    return next()
},express.json(),async(req,res)=>{
    if(req.body?.id_parking){
        let spot=await sendRequest("select * from Parking where id_parking=$1",[req.body.id_parking])
        if(spot?.length){
            let prices=await sendRequest("select * from Price where id_parking=$1",[req.body.id_parking])
            if(prices?.length)res.json({data:prices,error:null})
            else res.status(404).json({data:null,error:"У парковки нет тарифов"})
        }
        else res.status(404).json({data:null,error:"Парковочное место не найдено"})
    }
    else res.status(400).json({data:null,error:"Не все параметры были переданы"})
})


api.post('/arend',(req,res,next)=>{
    req.myBody=req.body
    return next()
},express.json(),async(req,res)=>{
    if(req?.myBody?.role=='user'){
        if(req.body?.payment_on_spot&&req.body?.id_price&&req.body?.payment_method&&req.body?.time_end&&req.body?.time_start){
            let price=await sendRequest("select * from Price where id_price=$1",[req.body.id_price])
            if(!price?.length)res.status(404).json({data:null,error:"Тариф не найден"})
            else{
                let time_start=new Date(req.body.time_start)
                let time_end=new Date(req.body.time_end)
                var timeDiff = Math.abs(time_end.getTime() - time_start.getTime());

                var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                var diffMonths = (time_end.getMonth() + 1 + time_end.getFullYear() * 12) - (time_start.getMonth() + 1 + time_start.getFullYear() * 12);
                var diffHours = Math.ceil(timeDiff / (1000 * 3600));

                let payedExist=await sendRequest(`select * from Arend where payyed=$1 and time_start_arend<=$2 and time_end_arend>=$3`,[true,time_start,time_end])
                if(payedExist?.length)res.status(500).json({data:null,error:"В данный период уже была осуществлена бронь"})
                else{
                    let sum
                    let time
                    switch(price[0].time_arend){
                        case 'час':
                            sum=price[0].value*diffHours
                            time=diffHours
                        break
                        case 'день':
                            sum=price[0].value*diffDays
                            time=diffDays
                        break
                        case 'мес.':
                            sum=price[0].value*diffMonths
                            time=diffMonths
                        break
                    }
                    await sendRequest("insert into Arend(id_user,id_price,id_method,payment_on_spot,time_start_arend,time_end_arend,sum)values($1,$2,$3,$4,$5,$6,$7)",[req?.myBody?.id_user,req.body.id_price,req.body?.payment_method,req.body.payment_on_spot,time_start,time_end,sum])
                    let arend=await sendRequest("select * from Arend where id_price=$1 and id_method=$2 and payment_on_spot=$3 and time_start_arend=$4 and time_end_arend=$5 and sum=$6 and id_user=$7",[req.body.id_price,req.body?.payment_method,req.body.payment_on_spot,time_start,time_end,sum,req?.myBody?.id_user])
                    let chat_owner=await sendRequest("select OwnerPark.* from Price join Parking on Price.id_parking=Parking.id_parking join OwnerPark on Parking.id_owner=OwnerPark.id_owner limit 1")
                    let buyer=await sendRequest("select * from AppUser where id_user=$1",[req?.myBody?.id_user])
                    if(chat_owner?.length&&chat_owner[0].telegram!=0){
                        let chat=await sendRequest("select * from AccountTelegram where id_account=$1",[chat_owner[0].telegram])
                        let account
                        if(buyer[0].telegram!=0)account=await sendRequest("select * from AccountTelegram where id_account=$1",[buyer[0].telegram])
                        let message={type:"rent_notice",data:{number:buyer[0].phone,account:account?.length?account[0].first_name+' '+account[0].last_name+' '+account[0].username:'<b>Не привязан</b>',costs:price[0].value+"₽/"+price[0].time_arend,date_start:time_start.toLocaleString(),date_end:time_end.toLocaleString(),id_arend:arend[0].id_arend}}
                        SendNotice(bot,chat[0].chat_id,message)
                    }
                    let sign=createHash('sha256').update(`95e35459-778d-4bf9-844b-b605ce8da713:${sum}:RUB:5862209a531293683d6eab66a8a98e34:${arend[0]?.id_arend}`).digest('hex')
                    let url=`https://aaio.io/merchant/pay?merchant_id=95e35459-778d-4bf9-844b-b605ce8da713&amount=${sum}&currency=RUB&order_id=${arend[0].id_arend}&sign=${sign}&lang=ru`
                    res.json({data:{counts:time,time_arend:price[0].time_arend,sum,url},error:null})
                }
            }        
        }
        else res.status(400).json({data:null,error:"Не все параметры были переданы"})
    }
    else res.status(401).json({data:null,error:"Владелец парковки не может забронировать место"})
})

let upload=multer()
api.post('/notice',upload.none(),async(req,res)=>{
    let arend=await sendRequest("select * from Arend where id_arend=$1",[req.body.order_id])
    if(arend?.length&&!arend[0].payyed){
        await sendRequest("update Arend set payyed=$1 where id_arend=$2",[true,req.body.order_id])
        let phone=(await sendRequest("select * from AppUser where id_user=$1",[arend[0].id_user]))[0].id_user
        let acc
        let account='(Не привязан)'
        if(phone[0].telegram!=0)acc=await sendRequest("select * from AccountTelegram where id_account=$1",[phone[0].telegram])
        if(acc?.length)account=acc[0].first_name+" "+acc[0].last_name+' @'+acc[0].username
        let time_start_arend=arend[0].time_start_arend
        let time_end_arend=arend[0].time_end_arend
        let message={type:"payment_notice",data:{phone:phone[0].phone,account,costs,time_start_arend,time_end_arend}}
        let owner=await sendRequest("select OwnerPark.* from Price join Parking on Spot.id_parking=Parking.id_parking join OwnerPark on Parking.id_owner=OwnerPark.id_owner where Price.id_price=$1",[arend[0].id_price])
        let chat
        if(owner?.length&&owner[0].id_owner!=0)chat=await sendRequest("select * from AccountTelegram where id_account=$1",[owner[0].telegram])
        if(chat?.length)SendNotice(bot,chat[0].chat_id,message)
    }
    res.json()
})

export default api