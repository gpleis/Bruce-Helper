import { describe, it, expect, vi } from 'vitest';
import { validateEnv } from '../src/config/env.js';

describe('validateEnv', () => {
	it('throws when DISCORD_TOKEN is missing', () => {
		vi.stubEnv('DISCORD_TOKEN', '');
		vi.stubEnv('DISCORD_CLIENT_ID', 'some-client-id');

		expect(() => validateEnv()).toThrow('Missing environment variables');
	});

	it('throws when DISCORD_CLIENT_ID is missing', () => {
		vi.stubEnv('DISCORD_TOKEN', 'some-token');
		vi.stubEnv('DISCORD_CLIENT_ID', '');

		expect(() => validateEnv()).toThrow('Missing environment variables');
	});

	it('returns BOT_TOKEN and CLIENT_ID when both env vars are set', () => {
		vi.stubEnv('DISCORD_TOKEN', 'test-token');
		vi.stubEnv('DISCORD_CLIENT_ID', 'test-client-id');

		const result = validateEnv();

		expect(result.BOT_TOKEN).toBe('test-token');
		expect(result.CLIENT_ID).toBe('test-client-id');
	});
});
