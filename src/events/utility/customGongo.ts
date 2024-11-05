import { Client } from 'discord.js';
import { playGongo } from '../../listeners/events/customGongo';

export const name = "gongo";

export async function execute(client: Client): Promise<void> {
  await playGongo(client)
}