import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';

export default {
	input: 'src/index.ts',
	output: [
		{
			file: 'dist/index.cjs',
			format: 'cjs',
			sourcemap: true,
		},
		{
			file: 'dist/index.mjs',
			format: 'es',
			sourcemap: true,
		},
	],
	external: ['@public-ui/schema'],
	plugins: [
		typescript(),
		postcss({
			plugins: [],
			inject: false,
		}),
	],
};
