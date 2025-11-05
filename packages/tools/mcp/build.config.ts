import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
	entries: [
		{
			input: 'src/index.ts',
			name: 'index',
		},
		{
			input: 'src/mcp-server.ts',
			name: 'mcp-server',
		},
		{
			input: 'src/cli.ts',
			name: 'cli',
		},
		{
			input: 'src/data.ts',
			name: 'data',
		},
		{
			input: 'src/search.ts',
			name: 'search',
		},
		{
			input: 'src/logging.ts',
			name: 'logging',
		},
	],
	declaration: false,
	clean: true,
	outDir: 'dist',
	rollup: {
		emitCJS: true,
		inlineDependencies: false,
	},
});
