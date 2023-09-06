#!/usr/bin/env node

import { Command } from 'commander';
import migrate from './migrate';
import gradient from 'gradient-string';
import { getVersionOfPublicUiKoliBriCli } from './migrate/shares/reuse';

const versionOfPublicUiKoliBriCli = getVersionOfPublicUiKoliBriCli();

const Banner = gradient.atlas.multiline(
	`
,--. ,--.         ,--. ,--. ,-----.           ,--.
|  .'   /  ,---.  |  | \`--' |  |) /_  ,--.--. \`--'
|  .   '  | .-. | |  | ,--. |  .-.  \\ |  .--' ,--.
|  |\\   \\ | '-' | |  | |  | |  '--' / |  |    |  |
\`--' \`--´  \`---´  \`--' \`--' \`------´  \`--'    \`--'
🚹 The accessible HTML-Standard | 👉 https://public-ui.github.io | ${versionOfPublicUiKoliBriCli}
`,
	{
		interpolation: 'hsv',
	},
);
console.log(Banner);

const program = new Command();

program.name('kolibri').description('CLI for executing some helpful commands for KoliBri projects.').version(versionOfPublicUiKoliBriCli);

// Add commands
migrate(program);

program.parse();
