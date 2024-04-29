import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

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
		nodeResolve(),
		commonjs(),
		postcss({
			plugins: [],
			inject: false,
		}),
	],
};
