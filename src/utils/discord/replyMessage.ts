import { Message, TextChannel } from "discord.js";

export async function replyMessage(message: Message, content: string): Promise<void> {
  if (message.channel instanceof TextChannel) {
    await message.reply(content);
  }
}