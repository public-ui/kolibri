import { format } from 'prettier';
import parserCss from 'prettier/esm/parser-postcss.mjs';

export function formatReadableCssJson(code: string) {
	let css = `{`;
	const json = JSON.parse(code);
	for (const key in json) {
		try {
			json[key] = format(json[key], { parser: 'css', plugins: [parserCss] });
		} catch (e) {}
		css += `
`;
		css += '"' + key + '": `' + json[key].replace(/(\n\r?)+$/, '') + '`,';
	}
	css += `}`;
	console.log(css);
	return css;
}

export function copyToClipboard(str: string) {
	navigator.clipboard.writeText(str);
}
