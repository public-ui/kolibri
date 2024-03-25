import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
	entries: ['kolibri-src/index'],
	clean: true,
	declaration: true,
	externals: [],
	rollup: {
		emitCJS: true,
		inlineDependencies: true,
	},
});
