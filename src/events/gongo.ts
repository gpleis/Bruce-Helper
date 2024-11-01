import { Client } from 'discord.js';
import { playGongo } from '../services/playGongo';
import cron from 'node-cron';

export const data = {
    name: 'gongo',
    description: 'Plays Gongo every 30 minutes.'
};

export function execute(client: Client) {
    cron.schedule('*/30 * * * *', () => {
        playGongo(client);
    });
}