import { Message, SlashCommandBuilder } from "discord.js";
import { replyMessage } from "../../utils/discord/replyMessage";

export const data = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Replies with pong!");

export async function execute(message: Message): Promise<void> {
  replyMessage(message, "Pong");
};
