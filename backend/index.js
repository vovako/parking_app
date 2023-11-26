import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { SetApi } from './handlers/UnionAPI.js'
import { CreateBot } from './bot/Createbot.js'

process.on('uncaughtException',(err)=>{
    console.log('Неотловленная ошибка',err)
})

dotenv.config()
const server = express()

server.use(express.static('../public/'))
server.use(express.static('./public'))
server.use(cors())
server.use(express.urlencoded({ extended: true }))
SetApi(server)
export let tokens={}
export let bot=CreateBot()

server.listen(process.env.SERVER_PORT, () =>{console.log(`Server was started on: http://localhost:${process.env.SERVER_PORT}`)})