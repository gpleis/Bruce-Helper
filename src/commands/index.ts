import { Client, Collection, REST, Routes } from 'discord.js';
import { BOT_TOKEN, CLIENT_ID } from "../config/config"
import fs from 'node:fs';
import path from 'node:path';

// Exportação nomeada da função
export async function registerCommands(client: Client): Promise<void> {
  console.log("[INFO] Iniciando o registro de comandos");
  const deployCommands = []

  if (!client.commands) client.commands = new Collection();

  const commandsPath = path.join(__dirname, "utility");
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts') && file !== 'index.ts');

  for (const file of commandFiles) {
    const command = require(path.join(commandsPath, file));

    if (command.data && command.execute) {
      client.commands.set(command.data.name, command);
      deployCommands.push(command.data.toJSON())
      console.log(`[INFO] Comando ${command.data.name} ativo`);
    } else {
      console.warn(`[WARNING] O comando em ${file} está faltando "data" ou "execute"`);
    }
  }

  const rest = new REST().setToken(BOT_TOKEN);

  (async () => {
    try {
      console.log(`[INFO] Recarregando ${deployCommands.length} comandos`);

      await rest.put(
        Routes.applicationCommands(CLIENT_ID),
        { body: deployCommands },
      );

      console.log(`[INFO] ${deployCommands.length} comandos registrados com sucesso`);
    } catch (error) {
      console.error(error);
    }
  })();
}