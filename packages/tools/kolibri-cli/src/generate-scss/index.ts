import type { Command } from 'commander';
import { BEM_ALERT, BEM_ICON } from '@public-ui/components';
import { generateBemScssFile } from 'typed-bem/scss';

/**
 * This function is used to register the scss generator command.
 * @param {Command} program The program object to register the command
 */
export default function (program: Command): void {
	program
		.command('generate-scss')
		.description('Generate SCSS files with BEM selectors for KoliBri components (experimental).')
		.action(() => {
			generateBemScssFile(BEM_ALERT, 'alert');
			generateBemScssFile(BEM_ICON, 'icon');
		});
}
