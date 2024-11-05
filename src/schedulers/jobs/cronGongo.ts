import { Client } from 'discord.js';
import { playGongo } from '../../listeners/events/customGongo';
import cron from 'node-cron';

export const name = "gongo"

export function execute(client: Client): void {
	cron.schedule('0 3,15 * * * ', () => {
		playGongo(client);
	});
}