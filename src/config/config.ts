import { config } from 'dotenv';
import { validateEnv } from './env.js';

config();

const env = validateEnv();
export const BOT_TOKEN = env.BOT_TOKEN;
export const CLIENT_ID = env.CLIENT_ID;
