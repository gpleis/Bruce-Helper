import { Client } from "discord.js";
import path from "node:path";
import fs from "node:fs";
import { coloredLog } from "../utils/coloredLog";
import { colors } from "../utils/colors";
import chalk from "chalk";

export async function registerSchedulers(client: Client): Promise<void> {
	const schedulersCustomColor = colors.schedulers
	let validSchedulers = 0;

	coloredLog('Iniciando o registro de schedulers', { type: "info", hexColor: schedulersCustomColor })

	const schedulersPath = path.join(__dirname, "jobs")
	const schedulersFiles = fs.readdirSync(schedulersPath)

	for (const file of schedulersFiles) {
		const schedule = require(path.join(schedulersPath, file))
		const { name, execute } = schedule

    if (!name || !execute) {
      coloredLog(`O schedule em ${file} não possui uma propriedade 'name' ou 'execute'.`, { type: "info" });
      continue;
    }

		execute(client)
		validSchedulers++;
		coloredLog(`Schedule ${chalk.italic.underline(name)} ativo`, { type: "info", hexColor: schedulersCustomColor })
	}

	 coloredLog(`${chalk.italic(validSchedulers)} schedulers registrados com sucesso`, { type: "info", hexColor: schedulersCustomColor })
}