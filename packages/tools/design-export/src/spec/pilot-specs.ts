import type { BlockDesignSpec, DesignNode } from './types.js';

/**
 * Pilot design facets for four blocks: two leaves (`kol-span`, `kol-button`) and two compositions
 * that embed them (`kol-badge`, `kol-alert`). They mirror the functional components in
 * `packages/components/src/internal/functional-components` and are the reference for the format
 * in `types.ts`. Every element name is checked against the BEM registry by `checkSpec`.
 */

const SPAN_TREE: DesignNode = {
	tag: 'span',
	kind: 'frame',
	modifiers: { 'hide-label': { prop: '_hideLabel' } },
	children: [
		{
			element: 'container',
			tag: 'span',
			kind: 'frame',
			children: [
				{
					element: 'icon',
					tag: 'i',
					kind: 'icon',
					embeds: 'kol-icon',
					modifiers: { left: { prop: '_icons' } },
					when: { prop: '_icons' },
					glyph: { prop: '_icons' },
				},
				{
					element: 'label',
					tag: 'span',
					kind: 'text',
					when: { prop: '_hideLabel', value: false },
					text: { prop: '_label' },
				},
			],
		},
	],
};

const BUTTON_TREE: DesignNode = {
	tag: 'div',
	kind: 'frame',
	children: [
		{
			element: 'interactive-element',
			tag: 'button',
			kind: 'frame',
			interactive: true,
			children: [
				{
					element: 'text',
					tag: 'span',
					kind: 'frame',
					embeds: 'kol-span',
					embedProps: { _hideLabel: { prop: '_hideLabel' }, _icons: { prop: '_icons' }, _label: { prop: '_label' } },
				},
			],
		},
	],
};

export const PILOT_SPECS: BlockDesignSpec[] = [
	{
		block: 'kol-alert',
		axes: [
			{ kind: 'prop', name: 'Variant', prop: '_variant', values: ['card', 'msg'], modifier: 'variant-{value}' },
			{ kind: 'prop', name: 'Type', prop: '_type', values: ['default', 'error', 'info', 'success', 'warning'], modifier: 'type-{value}' },
			{ kind: 'prop', name: 'Closer', prop: '_hasCloser', values: [false, true] },
		],
		modifiers: { hasCloser: { prop: '_hasCloser' } },
		sample: { _label: 'Überschrift', _level: '0', _slot: 'Nachricht der Meldung.' },
		tree: {
			tag: 'div',
			kind: 'frame',
			children: [
				{
					element: 'icon',
					tag: 'i',
					kind: 'icon',
					embeds: 'kol-icon',
					glyph: {
						prop: '_type',
						map: {
							default: 'kolicon-alert-info',
							error: 'kolicon-alert-error',
							info: 'kolicon-alert-info',
							success: 'kolicon-alert-success',
							warning: 'kolicon-alert-warning',
						},
					},
				},
				{
					element: 'heading',
					tag: 'strong',
					kind: 'text',
					modifiers: { h0: { prop: '_level', value: '0' } },
					when: { prop: '_label' },
					text: { prop: '_label' },
				},
				{
					element: 'closer',
					tag: 'div',
					kind: 'frame',
					embeds: 'kol-button',
					when: { prop: '_hasCloser' },
					embedProps: {
						_hideLabel: { literal: true },
						_icons: { literal: 'kolicon-cross' },
						_label: { literal: 'Schließen' },
						_variant: { literal: 'normal' },
					},
				},
				{
					element: 'content',
					tag: 'div',
					kind: 'slot',
					text: { prop: '_slot' },
				},
			],
		},
	},
	{
		block: 'kol-badge',
		axes: [{ kind: 'prop', name: 'Smart Button', prop: '_smartButton', values: [false, true] }],
		modifiers: { 'has-smart-button': { prop: '_smartButton' } },
		sample: { _label: 'Badge' },
		tree: {
			tag: 'span',
			kind: 'frame',
			children: [
				{
					element: 'label',
					tag: 'span',
					kind: 'frame',
					embeds: 'kol-span',
					embedProps: { _label: { prop: '_label' } },
				},
				{
					element: 'smart-button',
					tag: 'div',
					kind: 'frame',
					embeds: 'kol-button',
					when: { prop: '_smartButton' },
					embedProps: { _hideLabel: { literal: true }, _icons: { literal: 'kolicon-cross' }, _label: { literal: 'Entfernen' } },
				},
			],
		},
	},
	{
		block: 'kol-button',
		axes: [
			{ kind: 'prop', name: 'Variant', prop: '_variant', values: ['danger', 'ghost', 'normal', 'primary', 'secondary', 'tertiary'], modifier: '{value}' },
			{ kind: 'prop', name: 'Disabled', prop: '_disabled', values: [false, true] },
			{ kind: 'state', name: 'Hover', state: 'hover' },
			{ kind: 'state', name: 'Focus', state: 'focus' },
		],
		modifiers: {
			disabled: { prop: '_disabled' },
			'hide-label': { prop: '_hideLabel' },
			inline: { prop: '_inline', value: true },
			standalone: { prop: '_inline', value: false },
		},
		sample: { _inline: false, _label: 'Schaltfläche' },
		tree: BUTTON_TREE,
	},
	{
		block: 'kol-span',
		axes: [],
		modifiers: { 'hide-label': { prop: '_hideLabel' } },
		sample: { _label: 'Text' },
		tree: SPAN_TREE,
	},
];
