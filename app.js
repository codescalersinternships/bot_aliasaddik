"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const token = process.env.BOT_TOKEN;
const telegram = new telegraf_1.Telegram(token);
const chatId = process.env.CHAT_ID;
const hoursProvided = process.env.HOURS;
const hours = +hoursProvided;
const axios = require("axios");
let data;
function post() {
    return __awaiter(this, void 0, void 0, function* () {
        const options = {
            headers: {
                'X-RapidAPI-Key': 'faf15dd0e5msh8846dab6a602e35p1071eejsn761e9fa1f686',
                'X-RapidAPI-Host': 'quotes15.p.rapidapi.com'
            }
        };
        const res = yield axios.get('https://quotes15.p.rapidapi.com/quotes/random/', options)
            .catch(function (error) {
            console.error(error);
        });
        data = res.data;
    });
}
setInterval(function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield post();
        telegram.sendMessage(chatId, data.content + "\n\n"
            + data.originator.name);
    });
}, hours * 3600000);
