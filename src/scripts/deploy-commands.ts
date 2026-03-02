import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";
import { REST, Routes } from "discord.js";
import { BOT_TOKEN, CLIENT_ID, GUILD_ID } from "../config/config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rest = new REST().setToken(BOT_TOKEN);

(async () => {
  try {
    const commands = [];
    const foldersPath = path.join(__dirname, "..", "commands");
    const commandFolders = fs.readdirSync(foldersPath);

    for (const folder of commandFolders) {
      const commandsPath = path.join(foldersPath, folder);
      const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith(".ts") || file.endsWith(".js"));

      for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = await import(filePath);
        if ("data" in command.default && "execute" in command.default) {
          commands.push(command.default.data.toJSON());
        } else {
          console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
      }
    }

    console.log(`Started refreshing ${commands.length} application (/) commands.`);
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands });
    console.log(`Successfully reloaded application (/) commands.`);
  } catch (error) {
    console.error(error);
  }
})();
