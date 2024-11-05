import { Client } from "discord.js";
import path from "node:path";
import fs from "node:fs";

export async function registerSchedulers(client: Client): Promise<void> {
	let validSchedulers = 0;

	console.log('[INFO] Iniciando o registro de schedulers')

	const schedulersPath = path.join(__dirname, "jobs")
	const schedulersFiles = fs.readdirSync(schedulersPath)

	for (const file of schedulersFiles) {
		const schedule = require(path.join(schedulersPath, file))
		const { name, execute } = schedule

    if (!name || !execute) {
      console.warn(`[WARNING] O schedule em ${file} não possui uma propriedade 'name' ou 'execute'.`);
      continue;
    }

		execute(client)
		validSchedulers++;
		console.log(`[INFO] Schedule ${name} ativo`)
	}

	 console.log(`[INFO] ${validSchedulers} schedulers registrados com sucesso`)
}