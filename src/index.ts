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
  await registerEvents(client); // Carrega os arquivos para eventos
  //registerListeners(client);

  client.login(BOT_TOKEN).catch((error) => {
    console.error("[ERRO] Falha ao fazer login do bot:", error);
  });
})();