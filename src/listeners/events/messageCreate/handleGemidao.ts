import { Client, Message, TextChannel } from "discord.js";
import { sendMessage } from "../../../utils/discord/sendMessage";
import { normalizeContent } from "../../../utils/normalizeContent";

export async function handleGemidao(message: Message, client: Client): Promise<void> {
  let normalizedMessage = normalizeContent(message.content)
  
  if (normalizedMessage.includes("gemidao")) {
		sendMessage(message, `OLHA O POMBÃO DO ${message.author} BOTANDO O GEMIDÃO`);
	}
}
