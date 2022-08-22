import { Telegram } from 'telegraf';
import dotenv from 'dotenv';
dotenv.config()

const token: string = process.env.BOT_TOKEN as string;

const telegram: Telegram = new Telegram(token);

const chatId: string = process.env.CHAT_ID as string;
const hoursProvided :string  = process.env.HOURS as string;
const hours :number =+ hoursProvided;

const axios = require("axios");
type DataType ={
    content:string,
    originator:{
      name: string
    }
}
let data:DataType ;

async function post(){
const options = {
     headers: {
      'X-RapidAPI-Key': 'faf15dd0e5msh8846dab6a602e35p1071eejsn761e9fa1f686',
      'X-RapidAPI-Host': 'quotes15.p.rapidapi.com'
    }
};

const res=await axios.get(  'https://quotes15.p.rapidapi.com/quotes/random/', options)
.catch(function (error:Error) {
	console.error(error);
});
data =res.data; 

 
}



setInterval(async function(){
 await post();
  telegram.sendMessage(chatId, data.content +"\n\n"
  + data.originator.name)
}, hours*3600000)
