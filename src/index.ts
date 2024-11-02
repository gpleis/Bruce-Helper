import { Client, GatewayIntentBits, Collection, TextChannel, Events } from 'discord.js';
import { BOT_TOKEN } from './config/config';
import { registerCommands } from './commands';
import { format } from 'date-fns'
import registerEvents from './events';
import registerListeners from './listeners';

(async () => {
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildVoiceStates,
      GatewayIntentBits.MessageContent,
    ],
  });

  console.log("[INFO] Inicializando bot...");

  // Registra comandos, eventos e listeners
  await registerCommands(client);  // Confirma que os comandos estão sendo registrados
  //registerEvents(client);
  //registerListeners(client);

  client.once('ready', () => {
    console.log(`[INFO] Bruce Helper está online! Logado como ${client.user?.tag}`);

    const uoltipapo: TextChannel | undefined = client.channels.cache.get("582999750308134916") as TextChannel
    uoltipapo.send(`Online desde ${format(new Date(), "dd/MM/yyyy - hh:mm:ss")}`)
  });

  // Faz o login do bot com o token do Discord
  client.login(BOT_TOKEN).catch((error) => {
    console.error("[ERRO] Falha ao fazer login do bot:", error);
  });

  client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      console.error(`No command matching ${interaction.commandName} was found.`);
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
      } else {
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
      }
    }
  });
})();