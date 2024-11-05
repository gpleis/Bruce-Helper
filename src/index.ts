import { Client, GatewayIntentBits } from 'discord.js';
import { BOT_TOKEN } from './config/config';
import { registerCommands } from './commands';
import registerEvents from './events';
import { registerSchedulers } from './schedulers';
import { coloredLog } from './utils/coloredLog';

(async (): Promise<void> => {
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildVoiceStates,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildMessageReactions,
      GatewayIntentBits.GuildInvites,
      GatewayIntentBits.GuildIntegrations,
      GatewayIntentBits.GuildMessageTyping,
      GatewayIntentBits.GuildPresences,
      GatewayIntentBits.GuildScheduledEvents
    ],
  });

  coloredLog("Inicializando bot...", { type: "info" });

  // Registra eventos, schedulers e comandos
  await registerEvents(client); // Carrega os arquivos para eventos
  await registerSchedulers(client) // Carrega os arquivos para cronjobs
  await registerCommands(client);  // Confirma que os comandos estão sendo registrados

  client.login(BOT_TOKEN).catch((error) => {
    coloredLog("Falha ao fazer login do bot: " + error.message, { type: "error" });
  });
})();