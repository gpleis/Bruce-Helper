import { CommandInteraction, SlashCommandBuilder } from "discord.js";

const data = new SlashCommandBuilder().setName("simounao").setDescription("Decide entre sim ou não, considerando cuidadosamente o contexto de MERDA que você está vivendo.");
const execute = async (interaction: CommandInteraction) => {
    const responses = ["Sim", "Não"];
    const response = responses[Math.floor(Math.random() * responses.length )];
    await interaction.reply(response ?? "Deu erro oh!");
}

export default { data, execute };