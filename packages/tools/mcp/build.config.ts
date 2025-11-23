import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
	entries: [
		'src/mcp', // HTTP server
		'src/cli', // stdio CLI
		'src/data', // Data utilities (needed by api/index.js)
		'src/search', // Search utilities (needed by api/index.js)
	],
	declaration: true,
	clean: true,
	failOnWarn: false,
	rollup: {
		emitCJS: true,
	},
});
