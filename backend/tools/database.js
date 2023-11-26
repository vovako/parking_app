import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()
const pool=new pg.Pool({
    host:process.env.HOST_DATABASE,
    port:process.env.PORT_DATABASE,
    database:process.env.NAME_DATABASE,
    user:process.env.USER_DATABASE,
    password:process.env.PASSWORD_DATABASE
})

pool.on('error',(err)=>console.log('Соединение с базой данных потеряно',err))

export const sendRequest=async(req,params)=>{
    try{
        const client=await pool.connect()
        if(client.listenerCount('error')==0){
            client.once('error',(err)=>{
                console.log('Ошибка клиента, подключенного к базе данных',err)
                client.release()
                return null
            })
        }
        const data=await client.query(req,params)
        client.release()
        return data?data.rows:null 
    }catch(err){
        console.log(err.stack)
        return null
    }
}