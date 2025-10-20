import { copyFile, unlink } from 'fs/promises';
import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
	entries: [
		{
			input: 'src/index.js',
			name: 'index',
		},
		{
			input: 'src/api-handler.js',
			name: 'api-handler',
		},
		{
			input: 'src/sample-index.js',
			name: 'sample-index',
		},
		{
			input: 'src/cli.js',
			name: 'cli',
		},
	],
	declaration: false,
	clean: true,
	outDir: 'dist',
	rollup: {
		emitCJS: true,
		inlineDependencies: false,
	},
	hooks: {
		'build:done': async () => {
			// Copy samples.json and samples.mjs to dist/
			try {
				await copyFile('src/samples.json', 'dist/samples.json');
				console.log('✅ Copied samples.json to dist/');

				await copyFile('src/samples.mjs', 'dist/samples.mjs');
				console.log('✅ Copied samples.mjs to dist/');

				// Delete temporary files
				await unlink('src/samples.json');
				await unlink('src/samples.mjs');
				console.log('🗑️ Cleaned up temporary src/samples files');
			} catch (error) {
				console.log('⚠️ Could not copy/cleanup sample files:', String(error));
			}
		},
	},
});
