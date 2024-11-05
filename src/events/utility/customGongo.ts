import { Client } from 'discord.js';
import { onCustomGongo } from '../../listeners/events/customGongo';

export const name = "gongo";

export async function execute(client: Client): Promise<void> {
  await onCustomGongo(client)
}