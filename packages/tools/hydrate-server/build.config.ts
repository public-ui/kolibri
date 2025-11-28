import { cp } from 'node:fs/promises';
import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
	entries: [
		{
			input: 'src/index',
			name: 'index',
		},
		{
			input: 'src/cli',
			name: 'cli',
		},
	],
	clean: true,
	declaration: true,
	failOnWarn: false,
	rollup: {
		emitCJS: true,
		inlineDependencies: false,
	},
	hooks: {
		'build:done': async () => {
			await cp('src/proto', 'dist/proto', { recursive: true });
		},
	},
});
