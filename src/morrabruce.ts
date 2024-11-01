import { REST, Routes } from 'discord.js';
import { BOT_TOKEN } from './config/config';

const baseId = '69102X4936Y1148810';
const possibleClientIds: string[] = [];

for (let x = 0; x <= 9; x++) {
  for (const y of ['5', '7']) {
    const clientId = baseId.replace('X', x.toString()).replace('Y', y);
    possibleClientIds.push(clientId);
  }
}

const rest = new REST({ version: '10' }).setToken(BOT_TOKEN);

async function testClientIds() {
  for (const clientId of possibleClientIds) {
    try {
      await rest.get(Routes.applicationCommands(clientId));
      console.log(`✅ Valid: ${clientId}`);
      break; 
    } catch (error) {
      console.log(`❌ Invalid: ${clientId}`);
    }
  }
}

// Run the function
testClientIds();