import { defineBuildConfig } from 'unbuild';
import postcss from 'rollup-plugin-postcss';
import type { Plugin } from 'rollup';

export default defineBuildConfig({
	entries: ['src/index'],
	clean: true,
	declaration: true,
	externals: [],
	rollup: {
		emitCJS: true,
    esbuild: {
      minify: true,
    },
		inlineDependencies: true,
	},
	hooks: {
		'rollup:options'(_buildContext, options) {
			options.plugins = Array.isArray(options.plugins) ? options.plugins : [];
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
