import chalk from "chalk"
import { format } from "date-fns"

type ColoredLogOptions = {
	type?: "info" | "error" | "warning",
	hexColor?: string
}

export async function coloredLog(text: string, options?: ColoredLogOptions): Promise<void> {
	let formattedMessage = options?.type ? `[${options?.type.toUpperCase()}] ${format(new Date(), "dd/MM/yyyy - HH:mm:ss")} | ${text}` : text

	const messageColors = {
		info: chalk.bold.blue,
		error: chalk.bold.red,
		warning: chalk.bold.yellow,
		custom: options?.hexColor ? chalk.hex(options?.hexColor) : chalk.white
	}

	console.log(messageColors[options?.hexColor ? "custom" : options?.type || "custom"](formattedMessage))
}