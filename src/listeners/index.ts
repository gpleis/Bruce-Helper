import { Client } from 'discord.js';
import fs from 'node:fs';
import path from 'node:path';

export default function registerListeners(client: Client) {
  const listenersPath = path.join(__dirname);
  const listenerFiles = fs.readdirSync(listenersPath).filter(file => file.endsWith('.ts') && file !== 'index.ts');

  for (const file of listenerFiles) {
    const { register } = require(path.join(listenersPath, file));
    if (typeof register === 'function') {
      register(client);
    } else {
      console.warn(`[WARNING] O listener em ${file} não possui uma função 'register'.`);
    }
  }
}