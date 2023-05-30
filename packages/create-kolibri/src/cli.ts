#!/usr/bin/env node

import { create } from 'create-create-cli';
import { resolve } from 'path';
import kleur from 'kleur';

const templateRoot = resolve(__dirname, '..', 'templates');

const caveat = (props: any) => {
	console.log(``);
	console.log(`🌟 ${kleur.underline().green('Your new app has been created successfully!')}`);
	console.log(``);
	console.log(kleur.bold().magenta('Next steps'));
	console.log(``);
	console.log(`1. You can now cd into the new project directory. (${kleur.cyan(`cd ${props.name}`)})`);
	console.log(`2. Read the README.md file in the project directory for more information on how to get started.`);
	console.log(`3. Read our documentation and coding samples at ${kleur.underline().cyan('https://public-ui.github.io')}`);
	console.log(``);
	console.log(`Ready? Come follow us at ${kleur.underline().cyan('https://github.com/public-ui')}`);
	console.log(kleur.gray('🚀 Good luck out there. '));
	console.log(``);
};

// See https://github.com/uetchy/create-create-app/blob/master/README.md for other options.

create('create-leanup', {
	templateRoot,
	defaultLicense: 'UNLICENSED',
	defaultPackageManager: 'pnpm',
	defaultTemplate: 'react-app',
	promptForAuthor: true,
	promptForDescription: true,
	promptForEmail: true,
	promptForLicense: false,
	promptForPackageManager: true,
	promptForTemplate: true,
	after: async (props: any) => {
		await props.run('cd', {
			argv0: props.name,
		});
		await props.run('git branch -m main');
		await props.run('git add .');
		// await props.run('git commit -m "chore: initial commit"');
	},
	caveat,
});
