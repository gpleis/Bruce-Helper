import { REST, Routes, SlashCommandBuilder } from 'discord.js';
import { BOT_TOKEN, CLIENT_ID } from './config';

const commands = [
  new SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!').toJSON(),
];

const rest = new REST({ version: '10' }).setToken(BOT_TOKEN);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationCommands(CLIENT_ID),
      { body: commands }
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();