import { Client } from 'discord.js';
import fs from 'node:fs';
import path from 'node:path';

export default function registerEvents(client: Client) {
  const eventsPath = path.join(__dirname);
  const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.ts') && file !== 'index.ts');

  for (const file of eventFiles) {
    const event = require(path.join(eventsPath, file));
    const { name, once, execute } = event;

    if (!name || !execute) {
      console.warn(`[WARNING] O evento em ${file} não possui uma propriedade 'name' ou 'execute'.`);
      continue;
    }

    if (once) {
      client.once(name, (...args) => execute(...args, client));
    } else {
      client.on(name, (...args) => execute(...args, client));
    }
  }
}