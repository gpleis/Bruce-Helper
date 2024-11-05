import { Client, Message, TextChannel } from "discord.js";
import { normalizeContent } from "../../../utils/normalizeContent";
import { sendMessage } from "../../../utils/discord/sendMessage";

export async function handleVtnc(message: Message, client: Client): Promise<void> {
  const vtncCases = [
    "va tomar no cu",
    "vai tomar no cu",
    "vtnc",
    "tnc",
    "tomar no cu",
    "vai toma no cu",
    "tomar nesse cu",
    "vai tomar nesse seu cu",
    "va tomar no cu va",
    "tomar no cu va",
    "tome no cu",
    "tome nesse cu",
    "tome no cu va",
    "tome nesse seu cu",
    "tome nesse seu cu va",
    "toma lá no teu cu",
    "tome lá no teu cu",
		"va dar o cu",
		"vai dar o cu",
		"va dar esse cu",
		"vai dar esse cu",
		"dar o cu",
		"dar esse cu",
  ];

	const vtncResponses = [
		"tomate cru é vitamina, como tu e tua prima",
		`ih ala o nome do cara é ${message.author}kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk`,
		"vai comer tua bunda",
		"sim",
		"tá engraçado hoje em seu filho duma puta, tá com o patati patatá enfiado no teu cu é",
		"n",
		"seu cu",
		"ok",
		"fodase",
		"gg gay",
		"cala a boca que vc tb eh um bot arrombado do carai"
	]

	const normalizedMessage = normalizeContent(message.content)

  if (vtncCases.some((vtncCase) => normalizedMessage.includes(vtncCase)) && normalizedMessage.includes("bot")) {
    const vtnc = Math.floor(Math.random() * 10 + 1);

		await sendMessage(message, vtncResponses[vtnc])
  }
}