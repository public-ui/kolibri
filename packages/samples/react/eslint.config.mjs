import { reactConfig } from '@public-ui/eslint-config';

export default reactConfig({
	tsconfigRootDir: import.meta.dirname,
	ignores: ['.vite/**', '**/complex-form/**'],
});
