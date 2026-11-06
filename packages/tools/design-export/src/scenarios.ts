import type { Scenario } from './render/render-svg.js';

/**
 * Default render scenarios, the pilot set of the concepts (PR #11379, PR #11518):
 * a few components, their visually relevant variants and the static states,
 * including focus. Interactive states beyond `default` are real browser states
 * (hover/focus through Playwright); `disabled` is a prop and therefore its own
 * scenario.
 */
export const DEFAULT_SCENARIOS: Scenario[] = [
	{
		id: 'kol-button.primary',
		tag: 'kol-button',
		props: { _label: 'Anmelden', _variant: 'primary' },
		states: ['default', 'hover', 'focus'],
	},
	{
		id: 'kol-button.primary.disabled',
		tag: 'kol-button',
		props: { _label: 'Anmelden', _variant: 'primary', _disabled: true },
		states: ['default'],
	},
	{
		id: 'kol-button.ghost',
		tag: 'kol-button',
		props: { _label: 'Abbrechen', _variant: 'ghost' },
		states: ['default'],
	},
	{
		id: 'kol-button.danger',
		tag: 'kol-button',
		props: { _label: 'Löschen', _variant: 'danger' },
		states: ['default'],
	},
	{
		id: 'kol-input-text',
		tag: 'kol-input-text',
		props: { _label: 'E-Mail' },
		states: ['default', 'focus'],
	},
	{
		id: 'kol-alert.msg',
		tag: 'kol-alert',
		props: { _label: 'Hinweis' },
		content: 'Speichern erfolgreich.',
		states: ['default'],
	},
	{
		id: 'kol-badge',
		tag: 'kol-badge',
		props: { _label: 'Neu' },
		states: ['default'],
	},
];
