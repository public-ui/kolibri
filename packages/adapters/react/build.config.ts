import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
	entries: ['index.ts'],
	clean: true,
	declaration: true,
	rollup: {
		emitCJS: true,
		inlineDependencies: true,
	},
});
