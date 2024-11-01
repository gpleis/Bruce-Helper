import { Client, Message } from 'discord.js';

type Handler = (client: Client, message: Message) => Promise<void>;

const commandHandlers: { [key: string]: Handler } = {
    ping: async (client, message) => {
        await message.reply('Pong!');
    },
    hello: async (client, message) => {
        await message.reply('Hello there!');
    }
};

async function handleDotCall(client: Client, message: Message) {
    const command = message.content.slice(1).trim().split(' ')[0];

    const handler = commandHandlers[command];
    if (handler) {
        await handler(client, message);
    } else {
        await message.reply(`Unknown command: ${command}`);
    }
}

export { handleDotCall };