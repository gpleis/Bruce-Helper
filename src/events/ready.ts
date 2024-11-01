import { Client } from 'discord.js';

export const name = 'ready';
export const once = true;

export function execute(client: Client) {
  console.log(`Bot logado como ${client.user?.tag} e pronto para operar!`);
}