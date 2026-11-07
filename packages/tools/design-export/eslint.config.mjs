import { globals, typescriptConfig } from '@public-ui/eslint-config';

export default typescriptConfig({
	tsconfigRootDir: import.meta.dirname,
	files: ['src/**/*.ts'],
	globals: globals.node,
});
