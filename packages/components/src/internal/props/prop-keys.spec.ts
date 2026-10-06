import { describe, expect, it } from '@jest/globals';
import * as props from './index';

/**
 * One prop definition per render key. Several definitions for the same key are allowed only where
 * the public props of different components are functionally different; each entry names that
 * difference. A new definition for an existing key needs a reason here, otherwise it reuses the
 * existing one.
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
	options: { definitions: ['optionsProp', 'optionsWithOptgroupProp'], reason: 'flat options (radio, single select) vs. options with optgroups (select)' },
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

const definitionsByKey = (): Record<string, string[]> => {
	const byKey: Record<string, string[]> = {};
	Object.entries(props).forEach(([name, value]) => {
		if (typeof value === 'object' && value !== null && typeof (value as { propName?: unknown }).propName === 'string') {
			const key = (value as { propName: string }).propName;
			(byKey[key] ??= []).push(name);
		}
	});
	return byKey;
};

describe('prop definitions per render key', () => {
	it('has one definition per key, except for the documented functional variants', () => {
		const duplicates = Object.fromEntries(
			Object.entries(definitionsByKey())
				.filter(([, names]) => names.length > 1)
				.map(([key, names]) => [key, [...names].sort()]),
		);
		expect(duplicates).toEqual(Object.fromEntries(Object.entries(VARIANTS).map(([key, { definitions }]) => [key, definitions])));
	});
});
