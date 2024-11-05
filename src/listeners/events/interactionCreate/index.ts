import { Client, Interaction } from 'discord.js';
import { handleChatInputCommand } from './handleChatInputCommand';

export async function onInteractionCreate(interaction: Interaction, client: Client): Promise<void> {
	if (interaction.isChatInputCommand()) {
		handleChatInputCommand(interaction)
	}
}