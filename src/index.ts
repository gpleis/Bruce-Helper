import { Client, GatewayIntentBits, Collection, TextChannel, Events } from 'discord.js';
import { BOT_TOKEN } from './config/config';
import { registerCommands } from './commands';
import { format } from 'date-fns'
import registerEvents from './events';
import { registerSchedulers } from './schedulers';

(async (): Promise<void> => {
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildVoiceStates,
      GatewayIntentBits.MessageContent,
    ],
  });

  console.log("[INFO] Inicializando bot...");

  // Registra eventos, schedulers e comandos
  await registerEvents(client); // Carrega os arquivos para eventos
  await registerSchedulers(client) // Carrega os arquivos para cronjobs
  await registerCommands(client);  // Confirma que os comandos estão sendo registrados

  client.login(BOT_TOKEN).catch((error) => {
    console.error("[ERRO] Falha ao fazer login do bot:", error);
  });
})();