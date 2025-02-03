import { ToasterService } from '@public-ui/components';
import { editor } from 'monaco-editor';
import { format } from 'prettier';
import parserTypeScript from 'prettier/esm/parser-typescript.mjs';
import { copyToClipboard, formatReadableCssJson } from './utils';

/**
 * - https://www.npmjs.com/package/sass
 * - https://www.npmjs.com/package/clean-css
 * - https://www.npmjs.com/package/monaco-editor
 */
export const createTsEditor = (ref: HTMLElement, theme: string, code: string) => {
	const Toaster = ToasterService.getInstance(document);
	const css = formatReadableCssJson(code).replace(/\\/g, '\\\\');
	copyToClipboard(css);
	void Toaster.enqueue({
		label: 'CSS code block copied to clipboard',
		description: 'You can now paste it in your javascript or typescript theme file.',
		type: 'info',
	});
	setTimeout(() => {
		try {
			code = format(
				`
import { KoliBriDevHelper, register } from '@public-ui/components';
import { defineCustomElements } from '@public-ui/components/dist/loader';
import { YOUR_THEME } from '…';

register(YOUR_THEME, defineCustomElements)
  .then(() => {
		/**
		 * You should patch the theme after the components and your default theme are registered.
		 *
		 * ↓ Here is your formatted code! (readable and better for git diff)
		 */
		KoliBriDevHelper.patchTheme('${theme}', ${css});
	})
	.catch(console.warn);
`,
				{ parser: 'typescript', plugins: [parserTypeScript] }
			);
		} catch (e) {}
		editor.create(ref, {
			value: code,
			language: 'typescript',
			theme: 'vs-dark',
			lineNumbers: 'on',
			showFoldingControls: 'mouseover',
			formatOnPaste: false,
			formatOnType: false,
			automaticLayout: false,
			readOnly: true,
		});
	}, 0);
};
