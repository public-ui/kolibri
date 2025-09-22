import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
	entries: [
		{
			input: 'kolibri-src/index',
			outDir: '.',
			name: 'index',
		},
	],
	clean: true,
	declaration: true,
	externals: [],
	rollup: {
		emitCJS: true,
		inlineDependencies: true,
	},
});
