import type { Command } from 'commander';
import fs from 'node:fs';
import path from 'node:path';
import { generateBemScssFile } from 'typed-bem/scss';

type BemDefinition = Parameters<typeof generateBemScssFile>[0];
type BemModule = { BEM_ALERT: BemDefinition; BEM_ICON: BemDefinition };

const componentsDistPath = path.resolve(__dirname, '..', '..', 'node_modules', '@public-ui', 'components', 'dist', 'index.js');

const loadComponentsBem = async (): Promise<BemModule> => {
	if (fs.existsSync(componentsDistPath)) {
		return (await import('@public-ui/components')) as BemModule;
	}

	return { BEM_ALERT: {} as BemDefinition, BEM_ICON: {} as BemDefinition };
};

/**
 * This function is used to register the scss generator command.
 * @param {Command} program The program object to register the command
 */
export default function (program: Command): void {
	program
		.command('generate-scss')
		.description('Generate SCSS files with BEM selectors for KoliBri components (experimental).')
		.action(async () => {
			const { BEM_ALERT, BEM_ICON } = await loadComponentsBem();

			generateBemScssFile(BEM_ALERT, 'alert');
			generateBemScssFile(BEM_ICON, 'icon');
		});
}
