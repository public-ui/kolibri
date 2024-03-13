import { defineConfig } from 'tsup';

export default defineConfig((options) => {
	return {
		clean: true,
		entry: ['src/index.ts'],
		minify: !options.watch,
		sourcemap: true,
		splitting: true,
	};
});
