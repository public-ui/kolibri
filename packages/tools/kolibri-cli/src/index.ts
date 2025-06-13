#!/usr/bin/env node

import { Command } from 'commander';
import gradient from 'gradient-string';

import generateScss from './generate-scss';
import info from './info';
import migrate from './migrate';
import { getVersionOfPublicUiKoliBriCli } from './migrate/shares/reuse';

const versionOfPublicUiKoliBriCli = getVersionOfPublicUiKoliBriCli();

const banner = gradient.atlas.multiline(
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
console.log(banner);

const program = new Command();

program.name('kolibri').description('CLI for executing some helpful commands for KoliBri projects.').version(versionOfPublicUiKoliBriCli);

// Add commands
generateScss(program);
info(program);
migrate(program);

program.parse();
