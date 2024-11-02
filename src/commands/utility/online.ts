import { Message, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("online")
  .setDescription("Check if the bot is alive displaying its latency!");

export const execute = (message: Message) => {
	message.reply(`Bot oficialmente online com ${message.client.ws.ping}ms`);
}