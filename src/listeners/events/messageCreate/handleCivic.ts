import { Client, GuildMember, Message, TextChannel } from "discord.js";
import { normalizeContent } from "../../../utils/normalizeContent";
import { sendMessage } from "../../../utils/discord/sendMessage";

function isDislikeCivic(content: string): boolean {
  const normalizedContent = normalizeContent(content);
  
  return (
    (normalizedContent.includes("não") || normalizedContent.includes("nao") || normalizedContent.includes("n")) &&
    normalizedContent.includes("gosto") &&
    normalizedContent.includes("civic")
  );
}

async function handleCivicDislike(message: Message): Promise<void> {
  if (isDislikeCivic(message.content)) {
    const member = message.member as GuildMember;

    if (member?.voice.channel) {
      try {
        await member.voice.setMute(true);
        
        // Verifica se o canal é um TextChannel antes de enviar a mensagem
        if (message.channel instanceof TextChannel) {
          await sendMessage(message, `${message.author}, você foi mutado por falar mal do Civic!`);
        }
      } catch (error) {
        console.error("Erro ao tentar mutar o usuário:", error);
      }
    }
  }
}

async function handleCivicMention(message: Message): Promise<void> {
  const normalizedContent = normalizeContent(message.content);

  if (normalizedContent.includes("civic") && !isDislikeCivic(normalizedContent)) {
    if (message.channel instanceof TextChannel) {
      await sendMessage(message, "Você disse...");
      const randInt = Math.floor(Math.random() * 5);

      for (let i = 0; i < randInt; i++) {
        await sendMessage(message, "Civic?");
      }
    }
  }
}

export async function handleCivic(message: Message, client: Client): Promise<void> {
  const normalizedContent = normalizeContent(message.content);
  
  if (isDislikeCivic(message.content)) {
    handleCivicDislike(message)
  } else if (normalizedContent.includes("civic") && !isDislikeCivic(normalizedContent)) {
    handleCivicMention(message)
  }
}