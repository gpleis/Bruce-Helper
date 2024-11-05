import { Message, TextChannel } from "discord.js";

export async function sendMessage(message: Message, content: string): Promise<void> {
  if (message.channel instanceof TextChannel) {
    await message.channel.send(content);
  }
}