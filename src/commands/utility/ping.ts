import { Message, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Replies with pong!");

export const execute = (message: Message) => {
  message.reply("Pong");
};
