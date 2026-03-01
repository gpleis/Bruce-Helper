# Bruce-Helper Copilot Instructions

## Project Overview

Bruce-Helper is a Discord bot built with **discord.js v14** and **TypeScript**. Source lives in `src/`, compiled output goes to `dist/`.

## Commands

```bash
npm run dev       # Run bot locally with tsx (no compile step)
npm run build     # Compile TypeScript to dist/
npm start         # Run compiled bot from dist/
npm run lint      # Lint src/ with ESLint
npm test          # Run Vitest in watch mode
npm run test:run  # Run tests once (CI)
```

Run a single test file:
```bash
npx vitest run tests/config.test.ts
```

## Project Structure

```
src/
  index.ts              # Entry point: creates Discord client, calls login
  config/
    env.ts              # Pure validateEnv() function — no side effects, fully testable
    config.ts           # Loads dotenv, calls validateEnv(), exports BOT_TOKEN & CLIENT_ID
tests/
  config.test.ts        # Unit tests for validateEnv()
vitest.config.ts
```

## Environment Variables

A `.env` file is required at the project root (see `.env.example`):

```
DISCORD_TOKEN=your_bot_token_here
DISCORD_CLIENT_ID=your_application_client_id_here
```

## Config Pattern

`src/config/env.ts` contains only the pure `validateEnv()` function — import from here in tests.
`src/config/config.ts` has the side effects (dotenv load + validation call) — import `BOT_TOKEN`/`CLIENT_ID` from here in application code.

Never read `process.env` directly outside of `src/config/`.

## Key Conventions

**Indentation**: Tabs (enforced by ESLint — do not use spaces).

**Brace style**: Stroustrup (`else`/`catch` on new lines after closing brace).

**Quotes**: Single quotes only.

**Trailing commas**: Required on all multiline structures.

**No inline comments**: ESLint enforces `no-inline-comments`; put comments on their own line.

**Imports**: Use `verbatimModuleSyntax` — always use `import type` for type-only imports. All relative imports need `.js` extensions (TypeScript ESM with `"module": "nodenext"`).

**Strict TypeScript**: `strict`, `noUncheckedIndexedAccess`, and `exactOptionalPropertyTypes` are all enabled.
