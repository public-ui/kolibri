import { KoliBriDevHelper } from '@public-ui/components';
import type { Generic } from 'adopted-style-sheets';
import { editor, KeyCode } from 'monaco-editor';
import { format } from 'prettier';
import parserCss from 'prettier/esm/parser-postcss.mjs';
import { storeThemeChange } from '../../shares/theme';

/**
 * - https://www.npmjs.com/package/sass
 * - https://www.npmjs.com/package/clean-css
 * - https://www.npmjs.com/package/monaco-editor
 */
export const createCssEditor = (model: editor.ITextModel, ref: HTMLElement, tagName: string, theme: string, setSignal: Function) => {
	setTimeout(() => {
		let css = KoliBriDevHelper.getCssStyle(theme, tagName as Generic.Theming.Props<string, string>);
		console.log('css', css);
		try {
			css = format(css, { parser: 'css', plugins: [parserCss] });
		} catch (e) {}
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
				KoliBriDevHelper.patchThemeTag(theme, tagName as Generic.Theming.Props<string, string>, css);
				storeThemeChange(theme, tagName, css);
				setSignal(() => false);
				const timeout = setTimeout(() => {
					clearTimeout(timeout);
					setSignal(() => true);
				});
			}
		});
	}, 0);
};
