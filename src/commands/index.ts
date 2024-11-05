import { Client, Collection, REST, Routes } from 'discord.js';
import { BOT_TOKEN, CLIENT_ID } from "../config/config"
import fs from 'node:fs';
import path from 'node:path';
import { coloredLog } from '../utils/coloredLog';
import { colors } from '../utils/colors';
import chalk from 'chalk';

// Exportação nomeada da função
export async function registerCommands(client: Client): Promise<void> {
  const commandsCustomColor = colors.commands
  const deployCommands = []
  
  coloredLog("Iniciando o registro de comandos", { type: "info", hexColor: commandsCustomColor });

  if (!client.commands) client.commands = new Collection();

  const commandsPath = path.join(__dirname, "utility");
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts') && file !== 'index.ts');

  for (const file of commandFiles) {
    const command = require(path.join(commandsPath, file));

    if (command.data && command.execute) {
      client.commands.set(command.data.name, command);
      deployCommands.push(command.data.toJSON())
      coloredLog(`Comando ${chalk.italic.underline(command.data.name)} ativo`, { type: "info", hexColor: commandsCustomColor });
    } else {
      coloredLog(`O comando em ${file} está faltando "data" ou "execute"`, { type: "warning" });
    }
  }

  const rest = new REST().setToken(BOT_TOKEN);

  (async () => {
    try {
      coloredLog(`Recarregando ${deployCommands.length} comandos`, { type: "info", hexColor: commandsCustomColor });

      await rest.put(
        Routes.applicationCommands(CLIENT_ID),
        { body: deployCommands },
      );

      coloredLog(`${chalk.italic(deployCommands.length)} comandos registrados com sucesso`, { type: "info", hexColor: commandsCustomColor });
    } catch (error: any) {
      coloredLog(error.message, { type: "error" });
    }
  })();
}