import { Message, SlashCommandBuilder } from "discord.js";

export default {
	data: new SlashCommandBuilder()
						.setName("ping")
						.setDescription("Replies with pong!"),
	execute: (message: Message) => {
		message.reply('Pong')
	}
}