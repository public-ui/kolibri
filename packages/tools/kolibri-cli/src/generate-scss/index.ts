import { BEM } from '@public-ui/components';
import type { Command } from 'commander';
import fs from 'fs';
import path from 'path';
import { generateBemScssFile } from 'typed-bem/scss';

interface GenerateScssOptions {
	output: string;
}

/**
 * This function is used to register the scss generator command.
 * @param {Command} program The program object to register the command
 */
export default function (program: Command): void {
	const bemRegistry = BEM as Record<string, unknown>;

	program
		.command('generate-scss')
		.description('Generate SCSS files with BEM selectors for KoliBri components (experimental).')
		.argument('<components...>', 'Component names to generate (e.g., alert icon)')
		.option('-o, --output <path>', 'Output directory for generated SCSS files', 'src/components')
		.action((components: string[], options: GenerateScssOptions) => {
			// Use provided output path relative to current working directory
			const outputDir = path.resolve(process.cwd(), options.output);

			// Create output directory if it doesn't exist
			if (!fs.existsSync(outputDir)) {
				fs.mkdirSync(outputDir, { recursive: true });
			}

			console.log(`📂 Generating SCSS files in: ${outputDir}`);

			// Change to output directory for generation
			const originalCwd = process.cwd();
			process.chdir(outputDir);
			try {
				// Generate SCSS for each requested component
				for (const component of components) {
					const componentKey = `kol-${component}`;

					// Filter out skeleton and click-button
					if (component === 'skeleton' || component === 'click-button') {
						console.warn(`⚠️  Component '${component}' is not available for generation.`);
						continue;
					}

					const componentDefinition = bemRegistry[componentKey];
					if (typeof componentDefinition !== 'object' || componentDefinition === null) {
						const availableComponents = Object.keys(bemRegistry)
							.filter((key) => !key.includes('skeleton') && !key.includes('click-button'))
							.join(', ');
						console.warn(`⚠️  Component '${component}' not found in BEM registry. Available: ${availableComponents}`);
						continue;
					}

					// Generate SCSS with fixed kol-theme-component layer
					generateBemScssFile(
						{
							[componentKey]: componentDefinition,
						},
						component,
						{ layer: 'kol-theme-component' },
					);

					console.log(`✅ Generated ${component}.scss`);
				}

				console.log(`\n🎯 Generated with CSS layer: @layer kol-theme-component`);

				console.log(`\n💡 Next steps:`);
				console.log(`   1. Review generated files in ${options.output}/`);
				console.log(`   2. Add your CSS styles to the BEM selectors`);
				console.log(`   3. Build your theme to include the styled components`);
			} finally {
				// Restore original working directory
				process.chdir(originalCwd);
			}
		});
}
