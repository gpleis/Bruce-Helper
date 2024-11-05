import { Client } from 'discord.js';
import cron from 'node-cron';
import { CustomEvents } from '../../@types/customEvents';

export const name = CustomEvents.Gongo

export function execute(client: Client): void {
	cron.schedule('0 3,15 * * * ', () => {
		client.emit(CustomEvents.Gongo, client)
	});
}