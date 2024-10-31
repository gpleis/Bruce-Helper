const { Client, GatewayIntentBits, Partials } = require('discord.js');
const { token } = require('./config.json');

console.log(token);

// Functions
const { handleVtnc } = require('./services/vtnc');
const { handleDotCall } = require('./services/dotCall');
const { handleGemidao } = require('./services/gemidao');
const { handleBotInteraction } = require('./services/botInteraction');
const { handleQuestions } = require('./services/questions');

// App start
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildScheduledEvents
    ],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction] // Ensure partials if you need them
});

// When logged in
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
    client.user.setActivity('cu de Fonti', { type: 'WATCHING' });
    client.user.setStatus('dnd');
});

// Message interaction
client.on("messageCreate", message => {
    if (message.content.startsWith(".")) {
        handleDotCall(message, client);
    } else if (message.content.includes("gemid")) {
        handleGemidao(message);
    } else if (message.content.endsWith('vai tomar no cu')) {
        handleVtnc(message);
    } else if (message.content.includes('bot')) {
        handleBotInteraction(message);
    } else if (message.content.endsWith('?')) {
        handleQuestions(message);
    }
});

// Channel delete event
client.on('channelDelete', async channel => {
    const channelDeleteId = channel.id;

    try {
        const logs = await channel.guild.fetchAuditLogs({ type: 'CHANNEL_DELETE' });
        const entry = logs.entries.find(entry => entry.target.id === channelDeleteId);

        if (entry) {
            const author = entry.executor;

            // Specific channel name check and recreate logic
            if (channel.name.includes("refugo")) {
                const channelName = channel.name.split(' ');
                let index = parseInt(channelName[1], 10);
                index++;
                const name = `${channelName[0]} ${index}`;

                await channel.guild.channels.create({ name, type: 'GUILD_VOICE' });
            }

            client.channels.cache.get('582999750308134916').send(`<@${author.id}> tried to delete our refugo channel.`);
        }
    } catch (error) {
        console.error(error);
    }
});

// Welcome message for new guild members
client.on('guildMemberAdd', member => {
    client.channels.cache.get('582999750308134916').send(`Bem-vindo ${member}, comedor de bosta.`);
});

// Login
client.login(token);