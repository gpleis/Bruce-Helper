import { Interaction } from "discord.js";
import { coloredLog } from "../../../utils/coloredLog";

export async function handleChatInputCommand(interaction: Interaction): Promise<void> {
	if (!interaction.isChatInputCommand()) return;
	
	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		coloredLog(`O comando ${interaction.commandName} não foi encontrado.`, { type: "error" });
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error: any) {
		coloredLog(error.message, { type: "error" });
		
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: '[ERRO] Ocorreu um erro ao rodar este comando', ephemeral: true });
		} else {
			await interaction.reply({ content: '[ERRO] Ocorreu um erro ao rodar este comando', ephemeral: true });
		}
	}
} 