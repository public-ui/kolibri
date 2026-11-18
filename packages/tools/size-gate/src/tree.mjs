import { addSizes, prorate, ZERO } from './sizes.mjs';

function node(name, kind, sizes, children, meta) {
	return { children, kind, meta, name, sizes };
}

function sumChildren(children) {
	return children.reduce((sum, child) => addSizes(sum, child.sizes), ZERO);
}

/**
 * The kind that owns most bytes of a list of modules, so a chunk tile shows the color of its main content.
 */
function dominantKind(modules) {
	const totals = new Map();
	for (const module of modules) {
		totals.set(module.kind, (totals.get(module.kind) ?? 0) + module.sizes.raw);
	}
	return [...totals].sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'other';
}

function fileNode(file, meta) {
	if (file.modules.length === 0) {
		return node(file.file, 'other', file.sizes, undefined, meta);
	}
	const groups = new Map();
	for (const module of file.modules) {
		const list = groups.get(module.group) ?? [];
		list.push(node(module.module, module.kind, module.sizes));
		groups.set(module.group, list);
	}
	const children = [...groups].map(([group, modules]) => node(group, dominantKind(modules), sumChildren(modules), modules.length > 1 ? modules : undefined));
	return node(file.file, dominantKind(file.modules), file.sizes, children, meta);
}

/**
 * Hierarchy of the components treemap: role (core, entries, shared, not loaded) → chunk → owner → module.
 */
export function componentsTree(report) {
	const total = report.files.length;
	const roles = [
		['Core – every page', (file) => file.role === 'core'],
		['Components – *.entry.js', (file) => file.role === 'entry'],
		['Shared chunks', (file) => file.role === 'shared' && file.loadCount > 0],
		['Not loaded by any entry', (file) => file.role === 'shared' && file.loadCount === 0],
	];
	const children = roles
		.map(([name, match]) => {
			const files = report.files
				.filter(match)
				.map((file) => fileNode(file, `${file.file} – loaded by ${file.role === 'core' ? 'every page' : `${file.loadCount} entries`}`));
			return node(name, 'chunk', sumChildren(files), files);
		})
		.filter((role) => role.children.length > 0);
	return node(`dist/esm (${total} files)`, 'chunk', sumChildren(children), children);
}

/**
 * Hierarchy of the theme treemap: CSS strings → tag → duplicate groups, comments and own CSS; the
 * JavaScript of the bundle → owner → module.
 */
export function themeTree(report) {
	const groupIndex = new Map(report.groups.map((group, index) => [group, index + 1]));
	const sheets = report.sheets.map((sheet) => {
		const parts = [];
		let rest = sheet.sizes.raw - sheet.commentSizes.raw;
		for (const group of report.groups.filter((candidate) => candidate.sheets.includes(sheet.tag))) {
			const raw = Math.min(group.bytesPerSheet, Math.max(rest, 0));
			rest -= raw;
			parts.push(
				node(
					`#${groupIndex.get(group)} ${group.label}`,
					'duplicate',
					prorate(sheet.sizes, raw),
					undefined,
					`${group.rules} rules, in ${group.sheets.length} sheets`,
				),
			);
		}
		parts.push(node('comments', 'comment', prorate(sheet.sizes, sheet.commentSizes.raw)));
		parts.push(node('own CSS', 'css', prorate(sheet.sizes, Math.max(rest, 0))));
		return node(
			sheet.tag,
			'css',
			sheet.sizes,
			parts.filter((part) => part.sizes.raw > 0),
		);
	});
	const css = node('CSS strings', 'css', sumChildren(sheets), sheets);
	const children = [css];
	if (report.modules.length > 0) {
		const scripts = fileNode({ file: 'JavaScript', modules: report.modules.filter((module) => module.group !== '(unmapped)'), sizes: ZERO });
		if (scripts.children) {
			scripts.sizes = sumChildren(scripts.children);
			children.push(scripts);
		}
	}
	return node('dist/index.mjs', 'chunk', report.file, children);
}
