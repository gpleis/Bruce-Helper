import { Message } from "discord.js"

export function handleQuestions (message: Message) {
    if (message.content.endsWith('é gay?')) {
        const gay = Math.floor((Math.random()* 10) + 1)
        if (gay % 2 == 0) {
            message.reply(`Sim.`)
        }
        else {
            message.reply(`Não.`)
        }
    }
}