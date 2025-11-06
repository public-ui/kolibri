import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
	entries: [
		'src/mcp', // HTTP server
		'src/cli', // stdio CLI
	],
	declaration: true,
	clean: true,
	failOnWarn: false,
	rollup: {
		emitCJS: true,
	},
});
