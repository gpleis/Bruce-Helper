import { Client, Message } from "discord.js";
import { handleCivic } from "./handleCivic";
import { handleVtnc } from "./handleVtnc";
import { handleGemidao } from "./handleGemidao";
import { handleQuestions } from "./handleQuestions";

export async function onMessageCreate(message: Message, client: Client) {
	if (message.author.bot) return;
	
  const messageHandlers = [
		handleCivic,
		handleVtnc,
		handleGemidao,
		handleQuestions
	]

	messageHandlers.forEach(async (handler) => await handler(message, client))
}