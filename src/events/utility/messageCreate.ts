import { Client, Events, Message } from 'discord.js';
import { onMessageCreate } from '../../listeners/events/messageCreate';

export const name = Events.MessageCreate;

export async function execute(message: Message, client: Client): Promise<void> {
	await onMessageCreate(message, client)
}