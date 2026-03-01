import { Client, Events, GatewayIntentBits } from 'discord.js';
import { BOT_TOKEN } from './config/config.js';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, (readyClient) => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.login(BOT_TOKEN);
