# Agent Instructions

This folder hosts all developer tooling packages (CLI, MCP server, shared scripts). Each tool is published as its own workspace package.

## Formatting discipline

- Run `pnpm --filter <tool-package> format -- --write` (or `pnpm format` at the root) right before committing so Prettier-stable files reach CI.
- Restage the files after formatting to ensure the final commit contains the auto-formatted output.

## Build & test expectations

- Use `pnpm --filter <tool-package> build` to create distributable artifacts.
- When touching shared helpers, run the affected tool's unit tests with `pnpm --filter <tool-package> test` before opening a PR.
