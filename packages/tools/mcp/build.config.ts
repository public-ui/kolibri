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
	],
	declaration: false,
	clean: true,
	outDir: 'dist',
	rollup: {
		emitCJS: true,
		inlineDependencies: false,
	},
});
