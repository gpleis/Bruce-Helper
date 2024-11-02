import { Message, SlashCommandBuilder } from "discord.js";

export default {
	data: new SlashCommandBuilder()
						.setName("online")
						.setDescription("Check if the bot is alive displaying its latency!"),
	execute: (message: Message) => {
		message.reply(`Bot oficialmente online com ${message.client.ws.ping}ms`)
	}
}