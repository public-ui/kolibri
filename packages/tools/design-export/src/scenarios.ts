import type { StyleAxes } from './derive-axes.js';
import { UNSET_VARIANT } from './derive-axes.js';
import type { Scenario } from './render/render-svg.js';

/** Props value that the harness replaces with a no-op callback. */
export const CALLBACK = '@function';

/**
 * Content of one component instance. A seed fixes only content (label, options, slotted
 * markup); the style axes (`_variant`, `_disabled`) and the interaction states are derived
 * from the implementation, the BEM registry and the theme CSS (see `deriveAxes`), so a seed
 * never lists variants by hand.
 */
interface ScenarioSeed {
	tag: string;
	/** Element properties (camelCase names, leading underscore kept). */
	props?: Record<string, unknown>;
	/** Text child, lands in the default slot. */
	content?: string;
	/** Slotted markup, for nested components such as tree items. */
	html?: string;
	/** Explicit states, for components that are visible only in a state (e.g. the focused skip navigation). */
	states?: string[];
	id?: string;
}

const OPTIONS = [
	{ label: 'Berlin', value: 'berlin' },
	{ label: 'Hamburg', value: 'hamburg' },
];

const LINKS = [
	{ _label: 'Start', _href: '#' },
	{ _label: 'Einstellungen', _href: '#' },
];

const TABS = [{ _label: 'Eins' }, { _label: 'Zwei' }];

const ITEM_LIST = [
	{ type: 'button', _label: 'Kopieren', _icons: 'kolicon-copy', _on: CALLBACK },
	{ type: 'button', _label: 'Einfügen', _icons: 'kolicon-paste', _on: CALLBACK },
];

const TABLE_HEADERS = {
	horizontal: [
		[
			{ key: 'id', label: 'ID', width: 80 },
			{ key: 'task', label: 'Aufgabe', width: 220 },
		],
	],
};
const TABLE_DATA = [
	{ id: 'T-01', task: 'Onboarding-Checkliste' },
	{ id: 'T-02', task: 'Barrierefreiheits-Audit' },
];

/**
 * One seed per component. Props follow the basic samples of the sample app;
 * callbacks use the CALLBACK marker so scenarios stay JSON.
 */
const SEEDS: ScenarioSeed[] = [
	{ tag: 'kol-abbr', props: { _title: 'zum Beispiel' }, content: 'z. B.' },
	{ tag: 'kol-accordion', props: { _label: 'Abschnitt' }, content: 'Versteckter Inhalt, der beim Aufklappen erscheint.' },
	{ tag: 'kol-alert', props: { _label: 'Hinweis' }, content: 'Speichern erfolgreich.' },
	{ tag: 'kol-avatar', props: { _label: 'Elke Mustermann' } },
	{ tag: 'kol-breadcrumb', props: { _label: 'Brotkrumen', _links: LINKS } },
	{ tag: 'kol-badge', props: { _label: 'Neu' } },
	{ tag: 'kol-button', props: { _label: 'Anmelden' } },
	{ tag: 'kol-button-link', props: { _label: 'Als Link', _on: CALLBACK } },
	{ tag: 'kol-card', props: { _label: 'Karte' }, content: 'Inhalt der Karte.' },
	{ tag: 'kol-combobox', props: { _label: 'Stadt', _options: OPTIONS, _on: CALLBACK } },
	{ tag: 'kol-details', props: { _label: 'Details' }, content: 'Der aufklappbare Inhalt.' },
	{ tag: 'kol-dialog', props: { _label: 'Dialog öffnen', _on: CALLBACK, _variant: 'blank' } },
	{ tag: 'kol-drawer', props: { _label: 'Drawer öffnen', _on: CALLBACK } },
	{ tag: 'kol-form', props: { _label: 'Formular' }, content: 'Formularfelder …' },
	{ tag: 'kol-heading', props: { _label: 'Überschrift', _level: 1 } },
	{ tag: 'kol-icon', props: { _label: 'Information', _icons: 'kolicon-alert-info' } },
	{ tag: 'kol-image', props: { _label: 'Beispielbild', _src: '/packages/samples/react/assets/sample-image.png' } },
	{ tag: 'kol-input-checkbox', props: { _label: 'Option wählen' } },
	{ tag: 'kol-input-color', props: { _label: 'Farbe' } },
	{ tag: 'kol-input-date', props: { _label: 'Datum' } },
	{ tag: 'kol-input-email', props: { _label: 'E-Mail' } },
	{ tag: 'kol-input-file', props: { _label: 'Datei' } },
	{ tag: 'kol-input-number', props: { _label: 'Anzahl' } },
	{ tag: 'kol-input-password', props: { _label: 'Passwort' } },
	{ tag: 'kol-input-radio', props: { _label: 'Variante A', _name: 'gruppe', _value: 'a' } },
	{ tag: 'kol-input-range', props: { _label: 'Wert' } },
	{ tag: 'kol-input-text', props: { _label: 'E-Mail' } },
	{ tag: 'kol-kolibri', props: { _label: 'KoliBri' } },
	{ tag: 'kol-link', props: { _label: 'Weiterlesen', _href: '#' } },
	{ tag: 'kol-link-button', props: { _label: 'Link-Schaltfläche', _href: '#' } },
	{ tag: 'kol-meter', props: { _label: 'Speicher', _value: 75, _max: 100 } },
	{ tag: 'kol-modal', props: { _label: 'Modal (deprecated)' } },
	{ tag: 'kol-nav', props: { _label: 'Navigation', _links: LINKS } },
	{ tag: 'kol-pagination', props: { _label: 'Blättern', _max: 5, _page: 1, _on: CALLBACK } },
	{ tag: 'kol-popover-button', props: { _label: 'Aktionen', _icons: 'kolicon-alert-info' } },
	{ tag: 'kol-progress', props: { _label: 'Distanz', _value: 4, _max: 7, _variant: 'bar' } },
	{ tag: 'kol-quote', props: { _quote: 'Avian carriers can provide high delay.' } },
	{ tag: 'kol-select', props: { _label: 'Stadt', _options: OPTIONS, _on: CALLBACK } },
	{ tag: 'kol-single-select', props: { _label: 'Stadt', _options: OPTIONS, _on: CALLBACK } },
	{ tag: 'kol-skeleton', props: { _label: 'Lädt …' } },
	{ tag: 'kol-skip-nav', id: 'kol-skip-nav.focused', props: { _label: 'Zum Inhalt springen', _links: LINKS }, states: ['focus'] },
	{ tag: 'kol-spin', props: { _label: 'Lädt', _show: true, _variant: 'cycle' } },
	{ tag: 'kol-split-button', props: { _label: 'Bearbeiten', _on: CALLBACK, _items: ITEM_LIST } },
	{ tag: 'kol-table-stateful', props: { _label: 'Aufgaben', _headers: TABLE_HEADERS, _data: TABLE_DATA } },
	{ tag: 'kol-table-stateless', props: { _label: 'Aufgaben', _headers: TABLE_HEADERS, _data: TABLE_DATA } },
	{ tag: 'kol-tabs', props: { _label: 'Register', _tabs: TABS, _on: CALLBACK } },
	{ tag: 'kol-textarea', props: { _label: 'Nachricht' } },
	{ tag: 'kol-toolbar', props: { _label: 'Werkzeuge', _items: ITEM_LIST } },
	{
		tag: 'kol-tree',
		props: { _label: 'Sitemap' },
		html: '<kol-tree-item _label="Start"></kol-tree-item><kol-tree-item _label="Einstellungen"></kol-tree-item>',
	},
	{ tag: 'kol-tree-item', props: { _label: 'Knoten' }, content: 'Unterpunkt' },
	{ tag: 'kol-version', props: { _label: '4.5.0' } },
];

/** The tags that have a seed, for the coverage check against the component list. */
export const SEED_TAGS: string[] = [...new Set(SEEDS.map((seed) => seed.tag))];

/**
 * The render scenarios of the library: every seed expanded to the matrix of its style axes,
 * `_variant` × `_disabled`. States stay open unless the seed fixes them; the renderer adds
 * hover, focus and both at once to every component that contains a focusable element.
 */
export function buildScenarios(axes: Record<string, StyleAxes>): Scenario[] {
	return SEEDS.flatMap((seed) => expandSeed(seed, axes[seed.tag] ?? { disabled: false }));
}

function expandSeed(seed: ScenarioSeed, axes: StyleAxes): Scenario[] {
	const base: Scenario = {
		id: seed.id ?? seed.tag,
		tag: seed.tag,
		props: seed.props ?? {},
		...(seed.states !== undefined ? { states: seed.states } : {}),
		...(seed.content !== undefined ? { content: seed.content } : {}),
		...(seed.html !== undefined ? { html: seed.html } : {}),
	};
	// Ein Seed mit festem Zustand (z. B. nur fokussiert sichtbar) bleibt eine Einzelkomponente.
	if (seed.states !== undefined) {
		return [base];
	}
	const variants: (string | undefined)[] = axes.variants ?? [undefined];
	return variants.flatMap((variant) => {
		const props = { ...base.props };
		delete props._variant;
		if (variant !== undefined && variant !== UNSET_VARIANT) props._variant = variant;
		const enabled: Scenario = {
			...base,
			id: variant === undefined ? base.id : `${base.id}.${variant}`,
			props,
			axes: [
				...(variant === undefined ? [] : [['Variant', variant] as [string, string]]),
				...(axes.disabled ? [['Disabled', 'false'] as [string, string]] : []),
			],
		};
		if (!axes.disabled) {
			return [enabled];
		}
		const disabled: Scenario = {
			...enabled,
			id: `${enabled.id}.disabled`,
			props: { ...props, _disabled: true },
			axes: [...(variant === undefined ? [] : [['Variant', variant] as [string, string]]), ['Disabled', 'true']],
		};
		return [enabled, disabled];
	});
}
