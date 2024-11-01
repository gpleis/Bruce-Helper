import { Client, GatewayIntentBits, Collection } from 'discord.js';
import { BOT_TOKEN } from './config/config';
import { registerCommands } from './commands';
import registerEvents from './events';
import registerListeners from './listeners';
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent,
  ],
});

console.log("[INFO] Inicializando bot...");

// Inicializa a coleção de comandos no client
client.commands = new Collection();

// Registra comandos, eventos e listeners
registerCommands(client);  // Confirma que os comandos estão sendo registrados
//registerEvents(client);
//registerListeners(client);

client.once('ready', () => {
  console.log(`[INFO] Bot está online! Logado como ${client.user?.tag}`);
});

// Faz o login do bot com o token do Discord
client.login(BOT_TOKEN).catch((error) => {
  console.error("[ERRO] Falha ao fazer login do bot:", error);
});