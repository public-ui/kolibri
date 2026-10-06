import { describe, expect, it } from '@jest/globals';
import fs from 'node:fs';
import path from 'node:path';

/**
 * One prop definition per render key. Several definitions for the same key are allowed only where
 * the public props of different components are functionally different, or where a shared factory
 * types the value per component (callbacks, links, options); each entry names that reason. A new
 * definition for an existing key needs a reason here, otherwise it reuses the existing one.
 */
const VARIANTS: Record<string, { definitions: string[]; reason: string }> = {
	color: { definitions: ['colorProp', 'kolibriColorProp'], reason: 'color pair with contrast (badge, avatar) vs. RGB channels of the logo (kolibri)' },
	headers: {
		definitions: ['tableHeadersProp', 'tableStatefulHeadersProp'],
		reason: 'the stateful table derives the sort from the headers as given and passes them to the stateless table, which checks them',
	},
	href: { definitions: ['hrefProp', 'optionalHrefProp'], reason: 'required link target vs. optional link of the card' },
	icons: {
		definitions: ['horizontalIconsProp', 'iconsInputCheckboxProp', 'iconsProp', 'spanIconsProp'],
		reason: 'icons of a form field (left/right state), checkbox state icons, a single icon class, icons of a span (raw)',
	},
	label: {
		definitions: ['labelProp', 'labelWithExpertSlotProp'],
		reason:
			"labelWithExpertSlotProp only for components with an expert slot: it accepts every string and '' switches the expert slot on; labelProp checks the length ('' or at least two characters) and gives the label hints",
	},
	links: {
		definitions: ['breadcrumbLinksProp', 'navLinksProp', 'skipNavLinksProp'],
		reason: 'same factory (createLinksPropDefinition), typed per component entry and named in the hint',
	},
	loading: { definitions: ['loadingProp', 'tableLoadingProp'], reason: 'lazy/eager image loading vs. the busy state of a table' },
	max: {
		definitions: ['inputDateMaxProp', 'inputMaxProp', 'maxProp', 'paginationMaxProp'],
		reason: 'ISO date bound, number field bound, meter/progress maximum, item count of the pagination',
	},
	min: { definitions: ['inputDateMinProp', 'inputMinProp', 'minProp'], reason: 'ISO date bound, number field bound, meter minimum' },
	on: {
		definitions: [
			'alertCallbacksProp',
			'buttonCallbacksProp',
			'cardCallbacksProp',
			'collapsibleCallbacksProp',
			'dialogCallbacksProp',
			'drawerCallbacksProp',
			'formCallbacksProp',
			'imageCallbacksProp',
			'inputCallbacksProp',
			'linkCallbacksProp',
			'paginationCallbacksProp',
			'tableCallbacksProp',
			'tableStatefulCallbacksProp',
			'tabsCallbacksProp',
		],
		reason: 'typed per component callbacks; dialog, drawer and tabs keep only their known function callbacks',
	},
	options: {
		definitions: ['optionsWithOptgroupProp', 'radioOptionsProp', 'singleSelectOptionsProp'],
		reason: 'options with optgroups (select) vs. flat options of the same factory (createOptionsPropDefinition), where a radio option may carry a hint',
	},
	orientation: { definitions: ['orientationProp', 'radioOrientationProp'], reason: "documented default 'horizontal' vs. 'vertical' of the radio group" },
	type: {
		definitions: ['alertTypeProp', 'buttonTypeProp', 'inputDateTypeProp', 'inputTextTypeProp'],
		reason: 'different value sets per component',
	},
	value: {
		definitions: [
			'checkboxValueProp',
			'clampedNumberValueProp',
			'inputDateValueProp',
			'inputNumberValueProp',
			'radioValueProp',
			'selectValueProp',
			'stringValueProp',
		],
		reason: 'different value types per field: any value, clamped number, ISO date, number, single value, value list, text',
	},
	variant: {
		definitions: [
			'alertVariantProp',
			'variantDialogProp',
			'variantInputCheckboxProp',
			'variantProgressProp',
			'variantProp',
			'variantQuoteProp',
			'variantSpinProp',
		],
		reason: 'different value sets per component; variantProp is the custom class name list',
	},
};

/** The modules of this folder and its subfolders, without specs and barrels. */
const propModules = (dir: string): string[] =>
	fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			return propModules(full);
		}
		return /\.ts$/.test(entry.name) && !/\.(spec|test)\.ts$/.test(entry.name) && entry.name !== 'index.ts' ? [full] : [];
	});

/** Every prop definition exported by a module of this folder or its subfolders, whether the barrel re-exports it or not. */
const definitionsByKey = async (): Promise<Record<string, string[]>> => {
	const modules = (await Promise.all(propModules(__dirname).map((file) => import(file)))) as Record<string, unknown>[];
	const byKey: Record<string, Set<string>> = {};
	modules.forEach((exports) => {
		Object.entries(exports).forEach(([name, value]) => {
			if (typeof value === 'object' && value !== null && typeof (value as { propName?: unknown }).propName === 'string') {
				const key = (value as { propName: string }).propName;
				(byKey[key] ??= new Set()).add(name);
			}
		});
	});
	return Object.fromEntries(Object.entries(byKey).map(([key, names]) => [key, [...names]]));
};

const SRC = path.join(__dirname, '..', '..');
const PROPS_DIR = __dirname;

const sourceFilesOutsideProps = (dir: string): string[] =>
	fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			return full === PROPS_DIR ? [] : sourceFilesOutsideProps(full);
		}
		return /\.tsx?$/.test(entry.name) && !/\.(spec|test|e2e)\.tsx?$/.test(entry.name) && !entry.name.endsWith('.d.ts') ? [full] : [];
	});

describe('prop definitions per render key', () => {
	it('creates prop definitions only in internal/props', () => {
		const outside = sourceFilesOutsideProps(SRC)
			.filter((file) => /\bcreate\w*PropDefinition\s*[<(]/.test(fs.readFileSync(file, 'utf8')))
			.map((file) => path.relative(SRC, file));
		expect(outside).toEqual([]);
	});

	it('has one definition per key, except for the documented functional variants', async () => {
		const duplicates = Object.fromEntries(
			Object.entries(await definitionsByKey())
				.filter(([, names]) => names.length > 1)
				.map(([key, names]) => [key, [...names].sort()]),
		);
		expect(duplicates).toEqual(Object.fromEntries(Object.entries(VARIANTS).map(([key, { definitions }]) => [key, definitions])));
	});
});
