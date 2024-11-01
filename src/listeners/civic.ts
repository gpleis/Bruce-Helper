import { Client } from 'discord.js';

export function register(client: Client) {
  client.on("messageCreate", (message) => {
    if (message.content.includes("não gosto de Civic")) {
      const member = message.member;
      if (member) {
        member.voice.setMute(true);
        message.reply("Você foi mutado por falar mal do Civic!");
      }
    }
  });
}