import { Message, GuildMember, TextChannel, Client } from 'discord.js';

function normalizeContent(content: string): string {  
  return content
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/[^a-z0-9ã ]/g, '');
}

function isDislikeCivic(content: string): boolean {
  const normalizedContent = normalizeContent(content);
  return (
    (normalizedContent.includes("não") || normalizedContent.includes("nao") || normalizedContent.includes("n")) &&
    normalizedContent.includes("gosto") &&
    normalizedContent.includes("civic")
  );
}

export async function handleCivicDislike(message: Message) {
  if (isDislikeCivic(message.content)) {
    const member = message.member as GuildMember;
    if (member?.voice.channel) {
      try {
        await member.voice.setMute(true);
        
        // Verifica se o canal é um TextChannel antes de enviar a mensagem
        if (message.channel instanceof TextChannel) {
          await message.channel.send(`${message.author}, você foi mutado por falar mal do Civic!`);
        }
      } catch (error) {
        console.error("Erro ao tentar mutar o usuário:", error);
      }
    }
  }
}

export async function handleCivicMention(message: Message, client: Client) {
  const normalizedContent = normalizeContent(message.content);
  if (normalizedContent.includes("civic") && !isDislikeCivic(normalizedContent)) {
    if (message.channel instanceof TextChannel) {
      await message.channel.send("Você disse...");
      const randInt = Math.floor(Math.random() * 5);

      for (let i = 0; i < randInt; i++) {
        await message.channel.send("Civic?");
      }
    }
  }
}