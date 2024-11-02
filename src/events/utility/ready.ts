import { format } from 'date-fns';
import { Client, Events, TextChannel } from 'discord.js';

export const name = Events.ClientReady;
export const once = true;

export function execute(client: Client) {
  console.log(`[INFO] Bruce Helper está online! Logado como ${client.user?.tag}`);

  const bhDevChannel: TextChannel | undefined = client.channels.cache.get("1302296042196176998") as TextChannel
  bhDevChannel.send(`Online desde ${format(new Date(), "dd/MM/yyyy - HH:mm:ss")}`)
}