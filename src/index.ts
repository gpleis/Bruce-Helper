import { Client, Collection, Events, GatewayIntentBits, Message, MessageFlags } from "discord.js";
import { BOT_TOKEN } from "./config/config.js";
import handleCommands from "./utils/command-handler.js";
import "./utils/client-extension.js";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "There was an error while executing this command!",
        flags: MessageFlags.Ephemeral
      });
    } else {
      await interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
    }
  }
});

handleCommands(client).then(() => {
  client.login(BOT_TOKEN);
});
