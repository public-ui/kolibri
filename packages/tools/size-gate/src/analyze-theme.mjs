import { join } from 'node:path';
import { findDuplicateGroups, parseCss, stripComments } from './css-duplicates.mjs';
import { ownerOf } from './package-of.mjs';
import { attributeFile, readGenerated } from './read-map.mjs';
import { addSizes, measure, prorate, ZERO } from './sizes.mjs';

const CSS_VARIABLE = /^var (css_248z(?:\$\w+)?) = ("(?:[^"\\]|\\.)*");$/gm;
const CREATE_THEME = /\.createTheme\(\s*['"]([^'"]+)['"]\s*,\s*\{([\s\S]*?)\}/g;
const THEME_ENTRY = /(?:['"]([^'"]+)['"]|([A-Za-z_$][\w$]*))\s*:\s*([A-Za-z_$][\w$]*)/g;

const THEME_DEFAULTS = Object.freeze({
	/** Number of sheets that must carry the same CSS before it counts as duplicated. */
	minSheets: 3,
});

/**
 * The theme bundles parts of the components package; its source map points into `components/dist`.
 */
function themeOwnerOf(source) {
	const path = String(source).replace(/\\/g, '/');
	if (/(^|\/)components\/dist\//.test(path)) {
		return { group: '@public-ui/components', kind: 'dependency', module: path.replace(/^.*?components\/dist\//, '@public-ui/components/dist/') };
	}
	return ownerOf(path);
}

/**
 * Reads the CSS strings of a rollup-built theme (`rollup-plugin-postcss` with `inject: false`) and the tag
 * each `createTheme` call assigns them to.
 */
export function readThemeSheets(code) {
	const variables = new Map();
	for (const match of code.matchAll(CSS_VARIABLE)) {
		variables.set(match[1], { literalBytes: Buffer.byteLength(match[2]), value: JSON.parse(match[2]) });
	}
	const sheets = new Map();
	for (const theme of code.matchAll(CREATE_THEME)) {
		for (const entry of theme[2].matchAll(THEME_ENTRY)) {
			const tag = entry[1] ?? entry[2];
			const variable = variables.get(entry[3]);
			if (variable) {
				sheets.set(tag, { css: variable.value, literalBytes: variable.literalBytes, theme: theme[1], variable: entry[3] });
			}
		}
	}
	return sheets;
}

/**
 * Analyses a theme bundle (`dist/index.mjs`): the CSS string per tag, the CSS that several tags carry as
 * identical copies, the comments shipped inside the CSS and the JavaScript beside it.
 */
export async function analyzeTheme(dir, options = {}) {
	const settings = { ...THEME_DEFAULTS, ...options };
	const path = join(dir, 'index.mjs');
	const code = readGenerated(path);
	const file = measure(code);
	const sheets = readThemeSheets(code);

	const roots = new Map();
	const sheetReports = [];
	let literalBytes = 0;
	for (const [tag, sheet] of sheets) {
		const root = parseCss(sheet.css);
		roots.set(tag, root);
		const sizes = measure(sheet.css);
		const stripped = measure(stripComments(root), { brotli: false });
		literalBytes += sheet.literalBytes;
		sheetReports.push({ commentSizes: { brotli: 0, gzip: sizes.gzip - stripped.gzip, raw: sizes.raw - stripped.raw }, sizes, tag });
	}
	sheetReports.sort((a, b) => b.sizes.raw - a.sizes.raw);

	const groups = findDuplicateGroups(roots, settings);
	const redundantBytes = groups.reduce((sum, group) => sum + group.redundantBytes, 0);
	const sheetSizes = sheetReports.reduce((sum, sheet) => addSizes(sum, sheet.sizes), ZERO);
	const commentSizes = sheetReports.reduce((sum, sheet) => addSizes(sum, sheet.commentSizes), ZERO);

	const modules = [];
	const attribution = await attributeFile(path, code);
	if (attribution) {
		for (const [source, raw] of attribution) {
			modules.push({ ...themeOwnerOf(source), sizes: prorate(file, raw) });
		}
		modules.sort((a, b) => b.sizes.raw - a.sizes.raw);
	}
	const bundledComponents = modules.filter((module) => module.group === '@public-ui/components').reduce((sum, module) => addSizes(sum, module.sizes), ZERO);

	const metrics = {
		redundant: { field: 'raw', label: 'Redundant CSS (bytes)', rule: 'percent', sizes: { brotli: 0, gzip: 0, raw: redundantBytes } },
		sheets: { label: 'All CSS strings', rule: 'percent', sizes: sheetSizes },
		total: { label: 'Total dist/index.mjs', rule: 'percent', sizes: file },
	};
	for (const sheet of sheetReports) {
		metrics[`sheet:${sheet.tag}`] = { label: sheet.tag, rule: 'percent-or-bytes', sizes: sheet.sizes };
	}

	const candidates = [
		...groups.map((group) => ({
			action: `Emit \`${group.label}\` once (GLOBAL or a shared sheet) instead of in ${group.sheets.length} sheets.`,
			impactRaw: group.redundantBytes,
			kind: 'css-duplicate',
			subject: `${group.rules} rules × ${group.sheets.length} sheets, e.g. \`${group.example}\``,
		})),
		{
			action: 'Strip comments from the compiled CSS (Sass `style: compressed` or a CSS minifier).',
			impactRaw: commentSizes.raw,
			kind: 'css-comments',
			subject: 'Comments in the CSS strings',
		},
		{
			action: 'Keep `@public-ui/components` external in the theme bundle.',
			impactRaw: bundledComponents.raw,
			kind: 'bundled-dependency',
			subject: '@public-ui/components code inside the theme',
		},
	]
		.filter((candidate) => candidate.impactRaw > 0)
		.sort((a, b) => b.impactRaw - a.impactRaw);

	return {
		bundledComponents,
		candidates,
		commentSizes,
		file,
		groups,
		kind: 'theme',
		literalBytes,
		metrics,
		modules,
		redundantBytes,
		sets: {},
		sheetSizes,
		sheets: sheetReports,
		sourceMaps: attribution !== null,
	};
}
