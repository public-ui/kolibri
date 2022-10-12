import { editor } from 'monaco-editor';
import { format } from 'prettier';
import parserTypeScript from 'prettier/esm/parser-typescript.mjs';

/**
 * - https://www.npmjs.com/package/sass
 * - https://www.npmjs.com/package/clean-css
 * - https://www.npmjs.com/package/monaco-editor
 */
export const createTsEditor = (ref: HTMLElement, theme: string, code: string) => {
	setTimeout(() => {
		try {
			code = format(
				`
import { KoliBriDevHelper } from '@public-ui/components';

KoliBriDevHelper.patchTheme('${theme}', ${code}); `,
				{ parser: 'typescript', plugins: [parserTypeScript] }
			);
		} catch (e) {}
		editor.create(ref, {
			value: code,
			language: 'typescript',
			theme: 'vs-dark',
			lineNumbers: 'on',
			formatOnPaste: true,
			formatOnType: true,
			automaticLayout: true,
		});
	}, 0);
};
