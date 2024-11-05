import { Client } from 'discord.js';
import { onCustomGongo } from '../../listeners/events/customGongo';
import { CustomEvents } from '../../@types/customEvents';

export const name = CustomEvents.Gongo;

// Eventos criados pelo desenvolvedor devem por padrao ter o prefixo "custom" antes do nome do evento
export async function execute(client: Client): Promise<void> {
  await onCustomGongo(client)
}