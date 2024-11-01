import { Client, Collection } from 'discord.js';
import fs from 'node:fs';
import path from 'node:path';

// Exportação nomeada da função
export function registerCommands(client: Client) {
  console.log("[INFO] Iniciando o registro de comandos");

  if (!client.commands) client.commands = new Collection();

  const commandsPath = path.join(__dirname, 'commands');
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js') && file !== 'index.js');

  for (const file of commandFiles) {
    const command = require(path.join(commandsPath, file));

    if (command.data && command.execute) {
      client.commands.set(command.data.name, command);
      console.log(`[INFO] Comando carregado: ${command.data.name}`);
    } else {
      console.warn(`[WARNING] O comando em ${file} está faltando "data" ou "execute".`);
    }
  }
}