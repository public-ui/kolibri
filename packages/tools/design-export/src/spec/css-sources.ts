import { access } from 'node:fs/promises';
import { join } from 'node:path';
import * as sass from 'sass-embedded';

import type { ThemeStyles } from '../types.js';
import type { CssRule, UnsupportedRule } from './cascade.js';
import { parseRules } from './cascade.js';

/**
 * The CSS a component's shadow root adopts, in cascade order: the a11y and preset sheets and the
 * component's own base sheet from `packages/components` (compiled from source with Sass, so no
 * Stencil bundle has to be parsed), then the global and the component layer of the theme.
 */
export async function loadComponentRules(
	componentsRoot: string,
	theme: ThemeStyles,
	tag: string,
	unsupported: UnsupportedRule[],
): Promise<{ rules: CssRule[]; sources: string[] }> {
	const sources: string[] = [];
	const sheets: string[] = [];
	const componentDir = join(componentsRoot, 'src', 'components');
	for (const file of ['a11y.scss', 'preset.scss', join(tag.replace(/^kol-/, ''), 'style.scss')]) {
		const path = join(componentDir, file);
		if (!(await exists(path))) continue;
		sheets.push(await compile(path, componentsRoot));
		sources.push(`components/src/components/${file}`);
	}
	sheets.push(theme.globalCss);
	sources.push(`${theme.name}: GLOBAL`);
	if (theme.componentCss[tag]) {
		sheets.push(theme.componentCss[tag]);
		sources.push(`${theme.name}: ${tag}`);
	}
	const rules: CssRule[] = [];
	for (const sheet of sheets) rules.push(...parseRules(sheet, unsupported, rules.length));
	return { rules, sources };
}

const compiled = new Map<string, Promise<string>>();

function compile(path: string, componentsRoot: string): Promise<string> {
	if (!compiled.has(path)) {
		compiled.set(
			path,
			sass
				.compileAsync(path, { loadPaths: [join(componentsRoot, 'node_modules'), join(componentsRoot, '..', '..', 'node_modules')], style: 'expanded' })
				.then((result) => result.css),
		);
	}
	return compiled.get(path) as Promise<string>;
}

async function exists(path: string): Promise<boolean> {
	return access(path).then(
		() => true,
		() => false,
	);
}
