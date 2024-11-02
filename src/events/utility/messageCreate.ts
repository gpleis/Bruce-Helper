import { format } from 'date-fns';
import { Client, Events, Message, TextChannel } from 'discord.js';
import { handleCivicMention } from '../../services/civic';

export const name = Events.MessageCreate;

export function execute(message: Message, client: Client) {
	if (message.author.bot) return;
	
  const messageHandlers = [
		handleCivicMention
	]

	messageHandlers.forEach(handler => handler(message, client))
}