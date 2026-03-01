export function validateEnv() {
	const { DISCORD_TOKEN, DISCORD_CLIENT_ID } = process.env;

	if (!DISCORD_TOKEN || !DISCORD_CLIENT_ID) {
		throw new Error('Missing environment variables: DISCORD_TOKEN and DISCORD_CLIENT_ID are required');
	}

	return {
		BOT_TOKEN: DISCORD_TOKEN,
		CLIENT_ID: DISCORD_CLIENT_ID,
	};
}
