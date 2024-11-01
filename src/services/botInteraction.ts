import { Client, Message, TextChannel } from "discord.js";

export function handleBotInteraction(client: Client, message: Message) {
  let entry = message.content.toLowerCase();
  const channel = client.channels.cache.get(message.channelId) as TextChannel;

  if (!channel) return;

  // Boa bot
  if (entry === "boa bot, tô gostando de ver") {
    channel.send(":blush:");
  }
  // Não bot
  else if (entry === "não bot, assim não") {
    channel.send(":pleading_face:");
  }
  // Bot burro
  else if (entry.includes("bot") && entry.includes("burro")) {
    channel.send("burro é vc seu filho da puta");
  }
  // Te amou
  else if (entry.includes("te amo bot")) {
    channel.send("<:meuovo:864235249180737586>");
  }
}
