# KoliBri - CLI-Tools

## Motivation

## Installation

```bash
npm i -g @public-ui/kolibri-cli
pnpm i -g @public-ui/kolibri-cli
yarn add -g @public-ui/kolibri-cli
```

## Dry run

You have always the possibility of a dry run. Because before the migration will be executed, you need a clean git history of you project.

After the migration you can check the result with `git status` and `git diff`.

Is anything wrong, you can reset the migration with `git reset --hard HEAD~1`.
