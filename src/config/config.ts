import { config } from 'dotenv';
config();

const { DISCORD_TOKEN, DISCORD_CLIENT_ID } = process.env

if (!DISCORD_TOKEN || !DISCORD_CLIENT_ID) {
  throw new Error("Missing environment variables");
}

export const BOT_TOKEN = DISCORD_TOKEN || '';
export const CLIENT_ID = DISCORD_CLIENT_ID || '';