import { Client, Events, Interaction } from 'discord.js';
import { onInteractionCreate } from '../../listeners/events/interactionCreate';

export const name = Events.InteractionCreate;

export async function execute(interaction: Interaction, client: Client): Promise<void> {
	onInteractionCreate(interaction, client)
}