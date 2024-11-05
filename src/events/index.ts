import { Client } from 'discord.js';
import fs from 'node:fs';
import path from 'node:path';
import { colors } from '../utils/colors';
import { coloredLog } from '../utils/coloredLog';
import chalk from 'chalk';

export default function registerEvents(client: Client) {
  const eventsCustomColor = colors.events
  let validEvents = 0;

  coloredLog('Iniciando o registro de eventos', { type: "info", hexColor: eventsCustomColor })

  const eventsPath = path.join(__dirname, "utility");
  const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.ts') && file !== 'index.ts');

  for (const file of eventFiles) {
    const event = require(path.join(eventsPath, file));
    const { name, once, execute } = event;

    if (!name || !execute) {
      coloredLog(`O evento em ${file} não possui uma propriedade 'name' ou 'execute'`, { type: "warning" });
      continue;
    }

    if (once) {
      client.once(name, (...args) => execute(...args, client));
    } else {
      client.on(name, (...args) => execute(...args, client));
    }
    
    validEvents++;
    coloredLog(`Evento ${chalk.italic.underline(name)} ativo`, { type: "info", hexColor: eventsCustomColor })
  }

  coloredLog(`${chalk.italic(validEvents)} eventos registrados com sucesso`, { type: "info", hexColor: eventsCustomColor })
}