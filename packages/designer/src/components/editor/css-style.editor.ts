import { editor, KeyCode } from 'monaco-editor';
import { format } from 'prettier';
import parserCss from 'prettier/esm/parser-postcss.mjs';
import { KoliBriDevHelper } from '@public-ui/components';
import { storeThemes } from '../../shares/theme';

/**
 * - https://www.npmjs.com/package/sass
 * - https://www.npmjs.com/package/clean-css
 * - https://www.npmjs.com/package/monaco-editor
 */
export const createCssEditor = (model: editor.ITextModel, ref: HTMLElement, tagName: string, theme: string, setSignal: Function) => {
	setTimeout(() => {
		let css = ``;
		if (
			typeof window.A11yUi === 'object' &&
			window.A11yUi !== null &&
			typeof window.A11yUi.Themes === 'object' &&
			window.A11yUi.Themes !== null &&
			typeof window.A11yUi.Themes[theme] === 'object' &&
			window.A11yUi.Themes[theme] !== null &&
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			typeof window.A11yUi.Themes[theme][tagName] === 'string'
		) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
			css = window.A11yUi.Themes[theme][tagName] as string;
			try {
				css = format(css, { parser: 'css', plugins: [parserCss] });
			} catch (e) {}
		}
		model.setValue(css);
		const vs = editor.create(ref, {
			theme: 'vs-dark',
			lineNumbers: 'on',
			formatOnPaste: true,
			formatOnType: true,
			automaticLayout: true,
		});
		vs.setModel(model);

		vs.onKeyDown((event) => {
			if ((event.ctrlKey || event.metaKey) && event.keyCode === KeyCode.KeyS) {
				event.preventDefault();
				let css = vs.getValue();
				try {
					css = format(css, { parser: 'css', plugins: [parserCss] });
				} catch (e) {}
				model.setValue(css);
				model.updateOptions({
					tabSize: 2,
				});
				KoliBriDevHelper.patchThemeTag(theme, tagName, css);
				storeThemes();
				setSignal(() => false);
				const timeout = setTimeout(() => {
					clearTimeout(timeout);
					setSignal(() => true);
				});
			}
		});
	}, 0);
};
