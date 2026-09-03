#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Themes to analyze (excluding unstyled and special themes like ecl which have different structure)
const THEMES = ['default', 'desy', 'bwst', 'kern'];

// Theme base directory (absolute path)
const ABSOLUTE_THEME_BASE = path.resolve(__dirname, '../packages/themes');

// Use mixins directory instead of components (themes include mixins via components/*.scss)
const MIXINS_DIR = 'src/mixins';

/**
 * Extract CSS rules from SCSS content (simplified parsing)
 * Ignores:
 * - @layer, @use, @include, @mixin directives
 * - Variables (--*)
 * - Comments
 */
function extractCSSRules(content) {
	const lines = content.split('\n');
	const rules = [];
	let currentSelector = null;

	for (const line of lines) {
		const trimmed = line.trim();

		// Skip directives and includes
		if (trimmed.startsWith('@') || trimmed.startsWith('@include')) continue;
		// Skip variables
		if (trimmed.startsWith('--') || trimmed.includes('var(')) continue;
		// Skip comments
		if (trimmed.startsWith('//') || trimmed.startsWith('/*')) continue;
		// Skip empty lines
		if (!trimmed) continue;

		// Detect selector (ends with { or . or # or &)
		if (trimmed.includes('{') && !trimmed.startsWith('//')) {
			const selectorMatch = trimmed.match(/^([.#]?[\w-:,\s]+)\s*\{/);
			if (selectorMatch) {
				currentSelector = selectorMatch[1].trim();
				continue;
			}
		}

		// Detect property: value;
		if (trimmed.includes(':') && trimmed.endsWith(';') && currentSelector) {
			const propMatch = trimmed.match(/^([\w-]+)\s*:\s*([^;]+);$/);
			if (propMatch) {
				const property = propMatch[1].trim();
				const value = propMatch[2]
					.trim()
					.replace(/!important/g, '')
					.trim();

				// Skip properties that use variables
				if (!value.includes('var(')) {
					rules.push({
						selector: currentSelector,
						property,
						value,
					});
				}
			}
		}
	}

	return rules;
}

/**
 * Group rules by selector + property for redundancy detection
 */
function groupRules(rules) {
	const groups = {};

	for (const rule of rules) {
		const key = `${rule.selector}|${rule.property}`;

		if (!groups[key]) {
			groups[key] = {
				selector: rule.selector,
				property: rule.property,
				themes: {},
				occurrences: 0,
			};
		}

		groups[key].occurrences++;
	}

	return groups;
}

/**
 * Analyze redundancy across themes
 */
function analyzeRedundancy() {
	const componentFiles = {};

	// Collect all mixin files from all themes
	for (const theme of THEMES) {
		const mixinsDir = path.join(ABSOLUTE_THEME_BASE, theme, MIXINS_DIR);

		if (!fs.existsSync(mixinsDir)) {
			console.log(`⚠️  Theme '${theme}' has no mixins directory, skipping`);
			continue;
		}

		const files = fs.readdirSync(mixinsDir).filter((f) => f.endsWith('.scss'));

		for (const file of files) {
			const component = file.replace('.scss', '');

			if (!componentFiles[component]) {
				componentFiles[component] = {};
			}

			const filePath = path.join(mixinsDir, file);
			const content = fs.readFileSync(filePath, 'utf-8');
			const rules = extractCSSRules(content);

			componentFiles[component][theme] = {
				rules,
				count: rules.length,
			};
		}
	}

	// Find redundancies across themes
	const redundancies = [];

	for (const [component, themes] of Object.entries(componentFiles)) {
		const themeList = Object.keys(themes);

		if (themeList.length < 2) {
			continue; // Only one theme has this component
		}

		// Collect all rules from all themes for this component
		const allRules = [];
		for (const theme of themeList) {
			for (const rule of themes[theme].rules) {
				allRules.push({ ...rule, theme });
			}
		}

		// Group by selector + property
		const groups = {};
		for (const rule of allRules) {
			const key = `${rule.selector}|${rule.property}`;

			if (!groups[key]) {
				groups[key] = {
					selector: rule.selector,
					property: rule.property,
					values: {},
					themes: new Set(),
				};
			}

			groups[key].values[rule.value] = (groups[key].values[rule.value] || 0) + 1;
			groups[key].themes.add(rule.theme);
		}

		// Find exact redundancies (same value in all themes)
		for (const [key, group] of Object.entries(groups)) {
			if (group.themes.size === themeList.length && Object.keys(group.values).length === 1) {
				const value = Object.keys(group.values)[0];

				redundancies.push({
					component,
					selector: group.selector,
					property: group.property,
					value,
					themes: Array.from(group.themes),
					count: group.themes.size,
				});
			}
		}
	}

	return { componentFiles, redundancies };
}

/**
 * Categorize properties by basis suitability
 */
function categorizeProperty(property) {
	const layout = [
		'display',
		'position',
		'top',
		'left',
		'right',
		'bottom',
		'flex-direction',
		'justify-content',
		'align-items',
		'align-content',
		'align-self',
		'grid-template-columns',
		'grid-template-rows',
		'grid-template-areas',
		'grid-column',
		'grid-row',
		'overflow',
		'float',
		'clear',
		'z-index',
	];

	const box = [
		'width',
		'height',
		'min-width',
		'max-width',
		'min-height',
		'max-height',
		'margin',
		'margin-top',
		'margin-right',
		'margin-bottom',
		'margin-left',
		'padding',
		'padding-top',
		'padding-right',
		'padding-bottom',
		'padding-left',
		'border-width',
		'border-style',
		'border-radius',
	];

	const typography = [
		'font-family',
		'font-size',
		'font-weight',
		'font-style',
		'font-variant',
		'line-height',
		'letter-spacing',
		'word-spacing',
		'text-align',
		'text-decoration',
		'text-transform',
		'white-space',
		'word-break',
		'word-wrap',
	];

	const visibility = ['opacity', 'visibility', 'cursor', 'pointer-events'];

	const colors = ['color', 'background-color', 'border-color', 'box-shadow', 'text-shadow', 'outline-color'];

	if (colors.includes(property)) return 'NEVER';
	if (layout.includes(property)) return 'HIGH';
	if (box.includes(property)) return 'HIGH';
	if (typography.includes(property)) return 'HIGH';
	if (visibility.includes(property)) return 'MEDIUM';

	return 'MEDIUM';
}

// Run analysis
const { componentFiles, redundancies } = analyzeRedundancy();

console.log('\n🔍 THEME REDUNDANCY ANALYSIS\n');
console.log(`Analyzed themes: ${THEMES.join(', ')}`);
console.log(`Components with data: ${Object.keys(componentFiles).length}`);
console.log(`Total redundancies found: ${redundancies.length}\n`);

// Group redundancies by basis suitability
const byCategory = { HIGH: [], MEDIUM: [], NEVER: [] };

for (const r of redundancies) {
	const category = categorizeProperty(r.property);
	r.category = category;
	byCategory[category].push(r);
}

// Display HIGH priority redundancies (best candidates for basis)
console.log('🎯 HIGH PRIORITY - Layout, Box Model, Typography (Candidates for Basis)');
console.log(''.padEnd(160, '-'));
console.log(`${'Component'.padEnd(20)} ${'Selector'.padEnd(30)} ${'Property'.padEnd(20)} ${'Value'.padEnd(30)} ${'Themes'.padEnd(30)}`);
console.log(''.padEnd(160, '-'));

for (const r of byCategory.HIGH) {
	console.log(`${r.component.padEnd(20)} ${r.selector.padEnd(30)} ${r.property.padEnd(20)} ${r.value.padEnd(30)} ${r.themes.join(', ').padEnd(30)}`);
}

console.log(`\nTotal HIGH: ${byCategory.HIGH.length}\n`);

// Display MEDIUM priority
console.log('🔶 MEDIUM PRIORITY - Other properties');
console.log(''.padEnd(160, '-'));
console.log(`${'Component'.padEnd(20)} ${'Selector'.padEnd(30)} ${'Property'.padEnd(20)} ${'Value'.padEnd(30)} ${'Themes'.padEnd(30)}`);
console.log(''.padEnd(160, '-'));

for (const r of byCategory.MEDIUM) {
	console.log(`${r.component.padEnd(20)} ${r.selector.padEnd(30)} ${r.property.padEnd(20)} ${r.value.padEnd(30)} ${r.themes.join(', ').padEnd(30)}`);
}

console.log(`\nTotal MEDIUM: ${byCategory.MEDIUM.length}\n`);

// NEVER category (colors - should stay in themes)
console.log('🚫 NEVER (Colors - should stay in themes)');
console.log(`Total: ${byCategory.NEVER.length}`);
if (byCategory.NEVER.length > 0) {
	console.log(''.padEnd(160, '-'));
	for (const r of byCategory.NEVER.slice(0, 10)) {
		// Show first 10
		console.log(`${r.component.padEnd(20)} ${r.selector.padEnd(30)} ${r.property.padEnd(20)} ${r.value.padEnd(30)}`);
	}
	if (byCategory.NEVER.length > 10) {
		console.log(`... and ${byCategory.NEVER.length - 10} more`);
	}
}

console.log('\n');

// Summary per component
console.log('📊 REDUNDANCIES PER COMPONENT');
console.log(''.padEnd(80, '-'));
console.log(`${'Component'.padEnd(30)} ${'High'.padEnd(10)} ${'Medium'.padEnd(10)} ${'Never'.padEnd(10)} ${'Total'.padEnd(10)}`);
console.log(''.padEnd(80, '-'));

const componentStats = {};
for (const r of redundancies) {
	if (!componentStats[r.component]) {
		componentStats[r.component] = { HIGH: 0, MEDIUM: 0, NEVER: 0 };
	}
	componentStats[r.component][r.category]++;
}

for (const [component, stats] of Object.entries(componentStats).sort((a, b) => b[1].HIGH + b[1].MEDIUM - (a[1].HIGH + a[1].MEDIUM))) {
	const total = stats.HIGH + stats.MEDIUM + stats.NEVER;
	console.log(
		`${component.padEnd(30)} ${stats.HIGH.toString().padEnd(10)} ${stats.MEDIUM.toString().padEnd(10)} ${stats.NEVER.toString().padEnd(10)} ${total.toString().padEnd(10)}`,
	);
}

console.log(''.padEnd(80, '-'));

const totalHigh = byCategory.HIGH.length;
const totalMedium = byCategory.MEDIUM.length;
const totalNever = byCategory.NEVER.length;
console.log(
	`TOTAL`.padEnd(30) +
		totalHigh.toString().padEnd(10) +
		totalMedium.toString().padEnd(10) +
		totalNever.toString().padEnd(10) +
		(totalHigh + totalMedium + totalNever).toString().padEnd(10),
);
