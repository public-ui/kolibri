/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-floating-promises, @typescript-eslint/no-unsafe-call, @typescript-eslint/restrict-plus-operands */

import { format } from 'prettier';
import parserCss from 'prettier/esm/parser-postcss.mjs';

export function formatReadableCssJson(code: string) {
	let css = `{`;
	try {
		const json = JSON.parse(code) as Record<string, string>;
		for (const key in json) {
			try {
				json[key] = format(json[key], { parser: 'css', plugins: [parserCss] });
			} catch (e) {}
			css += `
`;
			css += '"' + key + '": `' + json[key].replace(/(\n\r?)+$/, '') + '`,';
		}
	} catch (e) {}
	css += `}`;
	return css;
}

export function copyToClipboard(str: string) {
	navigator.clipboard.writeText(str);
}
