import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";
import type { Client } from "discord.js";

export default async function handleCommands(client: Client): Promise<void> {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);
	const foldersPath = path.join(__dirname, "..", "commands");
	const commandFolders = fs.readdirSync(foldersPath);

	for (const folder of commandFolders) {
		const commandsPath = path.join(foldersPath, folder);
		const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith(".ts") || file.endsWith(".js"));

		for (const file of commandFiles) {
			const filePath = path.join(commandsPath, file);
			const { default: command } = await import(filePath);

			if ('data' in command && 'execute' in command) {
				client.commands.set(command.data.name, command.execute);
			}
			else {
				console.warn(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
			}
		}
	}
}
