import { Client, Events, Interaction } from 'discord.js';

export const name = Events.InteractionCreate;

export async function execute(interaction: Interaction, client: Client) {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`[ERRO] O comando ${interaction.commandName} não foi encontrado.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: '[ERRO] Ocorreu um erro ao rodar este comando', ephemeral: true });
		} else {
			await interaction.reply({ content: '[ERRO] Ocorreu um erro ao rodar este comando', ephemeral: true });
		}
	}
}