import { Message } from "discord.js"
import { replyMessage } from "../../../utils/discord/replyMessage"

async function handleIsGayQuestion(message: Message): Promise<void> {
	const gay = Math.floor((Math.random()* 10) + 1)

	if (gay % 2 == 0) {
		replyMessage(message, 'Sim.')
	}
	else {
		replyMessage(message, 'Não.')
	}
}

export async function handleQuestions(message: Message): Promise<void> {
	if (message.content.endsWith('é gay?')) {
		handleIsGayQuestion(message)
	}
}