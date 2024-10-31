import { Client, GatewayIntentBits, Events, TextChannel } from 'discord.js';
import { BOT_TOKEN } from './config/config';

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

client.once(Events.ClientReady, async client => {
  console.log(`Ready! Logged in as ${client.user?.tag}`);
});

client.on(Events.ClientReady, async thisClient => {
  const uoltipapo = client.channels.cache.get('582999750308134916') as TextChannel;

  uoltipapo?.send('ESTOU OFICIALMENTE ONLINE E METENDO')
})

client.on(Events.MessageCreate, async message => {
  if (message.author.bot) return;
  
  if (message.content.toLowerCase().includes('civic')) await message.channel.send('Civic?')
})

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;
  
  const { commandName } = interaction;

  if (commandName === 'ping') {
    await interaction.reply('Pong!');
  }
});

client.login(BOT_TOKEN);