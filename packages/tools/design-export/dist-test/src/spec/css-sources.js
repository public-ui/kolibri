import { access } from 'node:fs/promises';
import { join } from 'node:path';
import * as sass from 'sass-embedded';
import { parseRules } from './cascade.js';
/**
 * The CSS a component's shadow root adopts, in cascade order: the a11y and preset sheets and the
 * component's own base sheet from `packages/components` (compiled from source with Sass, so no
 * Stencil bundle has to be parsed), then the global and the component layer of the theme.
 */
export async function loadComponentRules(componentsRoot, theme, tag, unsupported) {
	const sources = [];
	const sheets = [];
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
	const rules = [];
	for (const sheet of sheets) rules.push(...parseRules(sheet, unsupported, rules.length));
	return { rules, sources };
}
const compiled = new Map();
function compile(path, componentsRoot) {
	if (!compiled.has(path)) {
		compiled.set(
			path,
			sass
				.compileAsync(path, { loadPaths: [join(componentsRoot, 'node_modules'), join(componentsRoot, '..', '..', 'node_modules')], style: 'expanded' })
				.then((result) => result.css),
		);
	}
	return compiled.get(path);
}
async function exists(path) {
	return access(path).then(
		() => true,
		() => false,
	);
}
