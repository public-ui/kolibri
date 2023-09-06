#!/usr/bin/env node

import { Command } from 'commander';
import migrate from './migrate';
import gradient from 'gradient-string';

const Banner = gradient.atlas.multiline(
	`
,--. ,--.         ,--. ,--. ,-----.           ,--.
|  .'   /  ,---.  |  | \`--' |  |) /_  ,--.--. \`--'
|  .   '  | .-. | |  | ,--. |  .-.  \\ |  .--' ,--.
|  |\\   \\ | '-' | |  | |  | |  '--' / |  |    |  |
\`--' \`--´  \`---´  \`--' \`--' \`------´  \`--'    \`--'
🚹 The accessible HTML-Standard | 👉 https://public-ui.github.io | 1.7.0-rc.0
`,
	{
		interpolation: 'hsv',
	},
);
console.log(Banner);

const program = new Command();

program.name('kolibri').description('CLI for executing some helpful commands for KoliBri projects.').version('1.7.0-rc.0');

// Add commands
migrate(program);

program.parse();
