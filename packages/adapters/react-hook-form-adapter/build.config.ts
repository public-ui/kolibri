import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
	entries: [
		{
			input: 'src/index',
			outDir: '.',
			name: 'index',
		},
	],
	clean: true,
	declaration: true,
	externals: ['@public-ui/components', '@public-ui/react-v19', 'react', 'react-dom', 'react-hook-form'],
	rollup: {
		emitCJS: true,
		inlineDependencies: false,
	},
});
