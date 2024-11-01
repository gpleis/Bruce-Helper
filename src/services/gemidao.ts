import { Client, Message, TextChannel } from "discord.js";

export function handleGemidao(client: Client, message: Message) {
  let entry = message.content;
  let channel = client.channels.cache.get(message.channelId) as TextChannel;
  
  entry = entry.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // tratando acentos
  entry = entry.toLowerCase();
    
  if (entry.includes("gemidao")) channel.send(`OLHA O POMBÃO DO ${message.author} BOTANDO O GEMIDÃO`);
}
