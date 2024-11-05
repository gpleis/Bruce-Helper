import { format } from 'date-fns';
import { Client, Events, TextChannel } from 'discord.js';
import { coloredLog } from '../../utils/coloredLog';
import { colors } from '../../utils/colors';

export const name = Events.ClientReady;
export const once = true;

export async function execute(client: Client): Promise<void> {
  coloredLog(`Bruce Helper está online! Logado como ${client.user?.tag}`, { type: "info" });

  const bhDevChannel: TextChannel | undefined = client.channels.cache.get("1302296042196176998") as TextChannel
  bhDevChannel.send(`Online desde ${format(new Date(), "dd/MM/yyyy - HH:mm:ss")}`)
}