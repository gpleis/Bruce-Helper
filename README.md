# Bruce-Helper

A Discord bot built with [discord.js v14](https://discord.js.org/) and TypeScript.

## Prerequisites

- [Node.js](https://nodejs.org/) v18+
- A Discord application and bot token — create one at the [Discord Developer Portal](https://discord.com/developers/applications)

## Setup

**1. Clone and install dependencies**

```bash
git clone https://github.com/gpleis/Bruce-Helper.git
cd Bruce-Helper
npm install
```

**2. Configure environment variables**

```bash
cp .env.example .env
```

Open `.env` and fill in your values:

| Variable             | Where to find it                                               |
| -------------------- | -------------------------------------------------------------- |
| `DISCORD_TOKEN`      | Developer Portal → Your App → Bot → Token                     |
| `DISCORD_CLIENT_ID`  | Developer Portal → Your App → General Information → Client ID |

**3. Invite the bot to your server**

Go to **Developer Portal → Your App → OAuth2 → URL Generator**, select the `bot` scope and the permissions your bot needs, then open the generated URL to invite it.

## Running

**Development** (runs directly with `tsx`, no compile step):

```bash
npm run dev
```

**Production**:

```bash
npm run build   # compile TypeScript to dist/
npm start       # run compiled bot
```

## Testing

```bash
npm test              # watch mode
npm run test:run      # run once (CI)
```

Run a single test file:

```bash
npx vitest run tests/config.test.ts
```

## Linting

```bash
npm run lint
```
