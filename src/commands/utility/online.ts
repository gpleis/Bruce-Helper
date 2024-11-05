import { Message, SlashCommandBuilder } from "discord.js";
import { replyMessage } from "../../utils/discord/replyMessage";

export const data = new SlashCommandBuilder()
  .setName("online")
  .setDescription("Check if the bot is alive displaying its latency!");

export async function execute(message: Message): Promise<void> {
	replyMessage(message, `Bot oficialmente online com ${message.client.ws.ping}ms`);
}