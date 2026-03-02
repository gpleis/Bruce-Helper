export function validateEnv() {
	const { DISCORD_TOKEN, DISCORD_CLIENT_ID, DISCORD_GUILD_ID } = process.env;

	if (!DISCORD_TOKEN || !DISCORD_CLIENT_ID || !DISCORD_GUILD_ID) {
		throw new Error('Missing environment variables: DISCORD_TOKEN, DISCORD_CLIENT_ID, and DISCORD_GUILD_ID are required');
	}

	return {
		BOT_TOKEN: DISCORD_TOKEN,
		CLIENT_ID: DISCORD_CLIENT_ID,
		GUILD_ID: DISCORD_GUILD_ID,
	};
}
