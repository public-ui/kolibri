# Agent Instructions

This folder hosts all developer tooling packages (CLI, MCP server, shared scripts). Each tool is published as its own workspace package.

> 🧹 **Formatting**: Follow the repo-wide “Format-first rule” in `/AGENTS.md`. Use `pnpm format` or `pnpm --filter <tool-package> format` before committing—no extra flags or manual write arguments are needed.

## Build & test expectations

- Use `pnpm --filter <tool-package> build` to create distributable artifacts.
- When touching shared helpers, run the affected tool's unit tests with `pnpm --filter <tool-package> test` before opening a PR.
