import { Client, GatewayIntentBits, Events, Message } from 'discord.js';
import {handleDotCall} from '../services/handleDotCall';

export const data = {
  name: 'dotCommands',
  description: 'Handles commands that start with a dot.',
};

export function execute(client: Client) {
  console.log(`[INFO] Registrando evento ${data.name}.`); // Confirma o registro do evento

  client.on(Events.MessageCreate, async (message: Message) => {
    console.log(`[INFO] Nova mensagem recebida: ${message.content}`); // Verifica se o evento foi disparado

    if (message.author.bot) {
      console.log(`[INFO] Mensagem ignorada, é de um bot: ${message.author.tag}`);
      return; // Ignora mensagens de bots
    }

    if (message.content.startsWith('.')) {
      console.log(`[INFO] Comando com "." detectado: ${message.content}`); // Confirma que a mensagem começa com "."
      await handleDotCall(client, message);
    }
  });
}