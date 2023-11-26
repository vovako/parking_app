import { Markup, Telegraf,Scenes,session} from "telegraf";
import { VerifyToken } from "../tools/JWT.js"
import { sendRequest } from "../tools/database.js"
import { tokens } from "../index.js";
import fs from 'fs'
import { randomUUID } from "crypto";


export function SendNotice(bot,chat_id,message){
    let inline_keyboard
    let text
    switch(message.type){
        case 'rent_notice':
            text=`🛎 <b>Новый запрос аренды!</b>\n<b>Телефон: </b>${message.data.number}\n<b>Телеграм аккаунт: </b>${message.data.account}\n<b>Цена: </b>${message.data.costs}\n<b>Дата начала: </b>${message.data.date_start}\n<b>Дата окончания: </b>${message.data.date_end}`
            inline_keyboard=[[Markup.button.callback('✅ Одобрить',`accept:${message.data.id_arend}`),Markup.button.callback('✖ Отклонить',`decline:${message.data.id_arend}`)]]
            break
        case 'report_notice':
            text=`🚧 <b>Новое обращение!</b>\n<b>Пользователь: </b>${message.data.account}\n<b>Описание:</b>${message.data.description}`
            break
        case 'payment_notice':
            text=`🎉 Аренда подтверждена\n<b>Телефон: </b>${message.data.phone}\n<b>Телеграм аккаунт: </b>${message.data.account}\n<b>Цена: </b>${message.data.costs}\n<b>Дата начала: </b>${new Date(message.data?.time_start_arend).toLocaleString()}\n<b>Дата окончания: </b>${new Date(message.data?.time_end_arend).toLocaleString()}`
            break
    }
    if(!message.data.photo)bot.telegram.sendMessage(chat_id,text,{reply_markup:{inline_keyboard},parse_mode:'HTML'}).catch(err=>console.log(err))
    else bot.telegram.sendPhoto(chat_id,{source:`./reports/${message.data.photo}.jpg`},{caption:text,parse_mode:'HTML'})
}

export function CreateBot(){
    let bot=new Telegraf("6713031119:AAHbAVutoiQAPAgid9PjCC9IHa9ZSesporE")
    const report = new Scenes.WizardScene(
        'report',
        (ctx) => {
            ctx.editMessageText("📍 Отправьте координаты места боту").catch(err=>null)
            ctx.wizard.next()
        },
        async (ctx) => {
            if(!ctx?.message?.location){
                ctx.reply("😱 От вас ожидались координаты широты и долготы, попробуйте еще раз").catch(err=>null)
                ctx.wizard.selectStep(1)
            }
            else{
                let parking=await sendRequest(`select * from Parking where ST_DWithin(location::geography,st_setsrid(ST_MakePoint(${ctx.message?.location?.latitude},${ctx.message?.location?.longitude}),4326)::geography,100)`)
                if(parking?.length){
                    ctx.scene.state.parking=parking[0]
                    ctx.reply("🔍 Найдена парковка, сообщение будет передано владельцу. Следующим сообщением опишите проблему").catch(err=>console.log(err))
                    ctx.wizard.next()
                }
                else{
                    ctx.reply("🥲 В радиусе 100 м. не было найдено парковок, попробуйте уточнить координаты").catch(err=>console.log(err))
                    ctx.scene.leave()
                }
            }
        },
        async(ctx)=>{
            if (ctx?.message?.text){
                ctx.scene.state.description=ctx?.message?.text
                ctx.reply("📹 Можете отправить фотографию, подтверждающую ваш донос").catch(err=>console.log(err))
                ctx.wizard.next()
            }
            else {
                ctx.reply("😱 От вас ожидалось сообщение текстом, попробуйте еще раз").catch(err=>console.log(err))
                ctx.wizard.selectStep(2)
            }
        },
        async(ctx)=>{
            let title=''
            if (ctx?.message?.document?.file_id) {
                let fileUrl = await bot.telegram.getFileLink(ctx?.message?.document?.file_id);
                const response = await fetch(fileUrl);
                const buffer = Buffer.from(await response.arrayBuffer());
                title = randomUUID();
                const directory = './reports/';
                if (!fs.existsSync(directory)) {
                    fs.mkdirSync(directory, { recursive: true });
                }
                fs.writeFileSync(`${directory}${title}.jpg`, buffer);
            }
            ctx.reply("📜 Донос зафиксирован")
            let owner_parking=await sendRequest("select OwnerPark.* from Parking join OwnerPark on Parking.id_owner=OwnerPark.id_owner where Parking.id_parking=$1",[ctx.scene.state.parking.id_parking])
            if(owner_parking?.length&&owner_parking[0].telegram!=0){
                let chat=await sendRequest("select * from AccountTelegram where id_account=$1",[owner_parking[0]?.telegram])
                let account=ctx.chat.first_name+' '+ctx.chat.last_name+' @'+ctx.chat.username
                let description=ctx.scene.state.description
                await sendRequest("insert into Report(description,image,reporter,id_parking)values($1,$2,$3,$4)",[description,title,account,ctx.scene.state.parking.id_parking])
                if(chat?.length)SendNotice(bot,chat[0].chat_id,{type:"report_notice",data:{photo:title,account,description}})
            }
            ctx.scene.leave()
        }
    )
    const scenes = new Scenes.Stage([report])
    bot.use(session())
    bot.use(scenes.middleware())
    bot.start(async (ctx)=>{
        let message = ctx.message.text.split(' ')
        if (message?.length>1) {
            let data=VerifyToken(tokens[message[1]])
            if(data.data==null)ctx.reply(`🛠 Токен авторизации не действителен`).catch(err=>null)
            else{
                let userBot=await sendRequest("select * from AccountTelegram where chat_id=$1",[ctx.chat.id])
                if(!userBot?.length){
                    let from=ctx.message.from
                    await sendRequest("insert into AccountTelegram(chat_id,first_name,last_name,username)values($1,$2,$3,$4)",[ctx.chat.id,from.first_name,from.last_name,from.username])
                    userBot=await sendRequest("select * from AccountTelegram where chat_id=$1",[ctx.chat.id])
                }
                let user
                if (data.data?.role=='owner'){
                    user=await sendRequest("select telegram,id_owner from OwnerPark where id_owner=$1",[data.data?.id])
                    if(!user?.length){
                        ctx.reply("🪤 Владелец парковки не был найден").catch(err=>null)
                        return
                    }
                    else if(user[0].telegram!=0)await sendRequest("delete from AccountTelegram where id_account=$1",[userBot[0].id_account])
                    await sendRequest("update OwnerPark set telegram=$1 where id_owner=$2",[userBot[0].id_account,user[0].id_owner])
                }
                else {
                    user=await sendRequest("select telegram,id_user from AppUser where id_user=$1",[data.data?.id])
                    if(!user?.length){
                        ctx.reply("🪤 Аккаунт пользователя не был найден").catch(err=>null)
                        return
                    }
                    else if(user[0].telegram!=0)await sendRequest("delete from AccountTelegram where id_account=$1",[userBot[0].id_account])
                    await sendRequest("update AppUser set telegram=$1 where id_user=$2",[userBot[0].id_account,user[0].id_user])
                }
                ctx.reply(`🎉 Аккаунт привязан, теперь сюда будут приходить уведомления`)
                .catch(err=>null)
            }
        }
        else ctx.reply(`Faspark - сервис для быстрого поиска парковочного места 🚗 в короткие сроки`,{reply_markup:{inline_keyboard:[[Markup.button.callback("🛠 Сообщить о проблеме","report")]]}}).catch(err=>console.log(err))
    })
    bot.action('report',(ctx)=>ctx.scene.enter('report'))
    bot.action(/^decline:[0-9]+$/,async(ctx)=>{
        let id=ctx.callbackQuery.data.split(":")[1]
        await sendRequest("delete from Arend where id_arend=$1",[id])
        ctx.deleteMessage().catch(err=>console.log(err))
    })
    bot.action(/^accept:[0-9]+$/,async(ctx)=>{
        let id=ctx.callbackQuery.data.split(":")[1]
        let user=await sendRequest("select AppUser.*,Arend.id_price,Arend.time_start_arend,Arend.time_end_arend from Arend join Price on Arend.id_price=Price.id_price join AppUser on Arend.id_user=AppUser.id_user where id_arend=$1",[id])
        let chat=await sendRequest("select * from AccountTelegram where id_account=$1",[user[0]?.telegram])
        let costPlace=await sendRequest("select * from Price where id_price=$1",[user[0].id_price])
        let costs=costPlace[0]?.value+"₽/"+costPlace[0]?.time_arend
        let account=chat?.length?chat[0]?.first_name+" "+chat[0]?.last_name+" "+chat[0]?.username:"(Не привязан)"
        await sendRequest("update Arend set payyed=$2 where id_arend=$1",[id,true])
        ctx.editMessageText(`🎉 Аренда подтверждена\n<b>Телефон: </b>${user[0]?.phone}\n<b>Телеграм аккаунт: </b>${account}\n<b>Цена: </b>${costs}\n<b>Дата начала: </b>${new Date(user[0]?.time_start_arend).toLocaleString()}\n<b>Дата окончания: </b>${new Date(user[0]?.time_end_arend).toLocaleString()}`,{parse_mode:'HTML'}).catch(err=>console.log(err))
    })
    bot.launch()
    .catch(err=>console.log(`Бот не упал по причине - ${err}`))
    return bot
}