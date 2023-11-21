import { defineBuildConfig } from 'unbuild';
import { Plugin } from 'rollup';
import postcss from 'rollup-plugin-postcss';

export default defineBuildConfig({
	entries: ['src/index'],
	clean: true,
	declaration: true,
	externals: [],
	rollup: {
		emitCJS: true,
		inlineDependencies: true,
	},
	hooks: {
		'rollup:options'(_buildContext, options) {
			options.plugins = (options.plugins ?? []) as Plugin[];
			options.plugins = options.plugins.filter((plugin) => (plugin as Plugin).name !== 'unbuild-raw');
			options.plugins.push(
				postcss({
					plugins: [],
					inject: false,
				}),
			);
		},
	},
});
