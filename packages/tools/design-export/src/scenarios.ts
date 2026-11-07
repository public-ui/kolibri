import type { Scenario } from './render/render-svg.js';

/** Props value that the harness replaces with a no-op callback. */
export const CALLBACK = '@function';

interface ScenarioSeed {
	tag: string;
	/** Element properties (camelCase names, leading underscore kept). */
	props?: Record<string, unknown>;
	/** Text child, lands in the default slot. */
	content?: string;
	/** Slotted markup, for nested components such as tree items. */
	html?: string;
	/** Adds the real browser states hover, focus and both at once to the default state. */
	interactive?: boolean;
	/** Explicit states, overriding the interactive default (e.g. focus-only for skip navigation). */
	states?: string[];
	id?: string;
	/** Expands the seed to one scenario per `_variant` value; the design library combines them into one variant set. */
	variants?: readonly string[];
	/**
	 * Adds a `_disabled` scenario per variant, with the same states: the design library switches
	 * `Disabled`, `Hover` and `Focus` independently, so every combination has to exist.
	 */
	disableable?: boolean;
}

/**
 * The `_variant` values of `kol-button` (schema `button-variant.ts`) without `custom`,
 * which only names a theme hook and has no styling of its own.
 */
export const BUTTON_VARIANTS = ['primary', 'secondary', 'normal', 'tertiary', 'danger', 'ghost'] as const;

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
 * One seed per component (plus variant seeds where the visuals differ enough
 * to matter in a design library). Props follow the basic samples of the
 * sample app; callbacks use the CALLBACK marker so scenarios stay JSON.
 */
const SEEDS: ScenarioSeed[] = [
	{ tag: 'kol-abbr', props: { _title: 'zum Beispiel' }, content: 'z. B.' },
	{ tag: 'kol-accordion', props: { _label: 'Abschnitt' }, content: 'Versteckter Inhalt, der beim Aufklappen erscheint.' },
	{ tag: 'kol-alert', props: { _label: 'Hinweis' }, content: 'Speichern erfolgreich.' },
	{ tag: 'kol-avatar', props: { _label: 'Elke Mustermann' } },
	{ tag: 'kol-breadcrumb', props: { _label: 'Brotkrumen', _links: LINKS } },
	{ tag: 'kol-badge', props: { _label: 'Neu' } },
	{ tag: 'kol-button', props: { _label: 'Anmelden' }, interactive: true, variants: BUTTON_VARIANTS, disableable: true },
	{ tag: 'kol-button-link', props: { _label: 'Als Link', _on: CALLBACK }, interactive: true },
	{ tag: 'kol-card', props: { _label: 'Karte' }, content: 'Inhalt der Karte.' },
	{ tag: 'kol-combobox', props: { _label: 'Stadt', _options: OPTIONS, _on: CALLBACK }, interactive: true },
	{ tag: 'kol-details', props: { _label: 'Details' }, content: 'Der aufklappbare Inhalt.' },
	{ tag: 'kol-dialog', props: { _label: 'Dialog öffnen', _on: CALLBACK, _variant: 'blank' }, interactive: true },
	{ tag: 'kol-drawer', props: { _label: 'Drawer öffnen', _on: CALLBACK }, interactive: true },
	{ tag: 'kol-form', props: { _label: 'Formular' }, content: 'Formularfelder …' },
	{ tag: 'kol-heading', props: { _label: 'Überschrift', _level: 1 } },
	{ tag: 'kol-icon', props: { _label: 'Information', _icons: 'kolicon-alert-info' } },
	{ tag: 'kol-image', props: { _label: 'Beispielbild', _src: '/packages/samples/react/assets/sample-image.png' } },
	{ tag: 'kol-input-checkbox', props: { _label: 'Option wählen' }, interactive: true },
	{ tag: 'kol-input-color', props: { _label: 'Farbe' }, interactive: true },
	{ tag: 'kol-input-date', props: { _label: 'Datum' }, interactive: true },
	{ tag: 'kol-input-email', props: { _label: 'E-Mail' }, interactive: true },
	{ tag: 'kol-input-file', props: { _label: 'Datei' }, interactive: true },
	{ tag: 'kol-input-number', props: { _label: 'Anzahl' }, interactive: true },
	{ tag: 'kol-input-password', props: { _label: 'Passwort' }, interactive: true },
	{ tag: 'kol-input-radio', props: { _label: 'Variante A', _name: 'gruppe', _value: 'a' }, interactive: true },
	{ tag: 'kol-input-range', props: { _label: 'Wert' }, interactive: true },
	{ tag: 'kol-input-text', props: { _label: 'E-Mail' }, interactive: true },
	{ tag: 'kol-kolibri', props: { _label: 'KoliBri' } },
	{ tag: 'kol-link', props: { _label: 'Weiterlesen', _href: '#' }, interactive: true },
	{ tag: 'kol-link-button', props: { _label: 'Link-Schaltfläche', _href: '#' }, interactive: true },
	{ tag: 'kol-meter', props: { _label: 'Speicher', _value: 75, _max: 100 } },
	{ tag: 'kol-modal', props: { _label: 'Modal (deprecated)' } },
	{ tag: 'kol-nav', props: { _label: 'Navigation', _links: LINKS } },
	{ tag: 'kol-pagination', props: { _label: 'Blättern', _max: 5, _page: 1, _on: CALLBACK }, interactive: true },
	{ tag: 'kol-popover-button', props: { _label: 'Aktionen', _icons: 'kolicon-alert-info' }, interactive: true },
	{ tag: 'kol-progress', props: { _label: 'Distanz', _value: 4, _max: 7, _variant: 'bar' } },
	{ tag: 'kol-quote', props: { _quote: 'Avian carriers can provide high delay.' } },
	{ tag: 'kol-select', props: { _label: 'Stadt', _options: OPTIONS, _on: CALLBACK }, interactive: true },
	{ tag: 'kol-single-select', props: { _label: 'Stadt', _options: OPTIONS, _on: CALLBACK }, interactive: true },
	{ tag: 'kol-skeleton', props: { _label: 'Lädt …' } },
	{ tag: 'kol-skip-nav', id: 'kol-skip-nav.focused', props: { _label: 'Zum Inhalt springen', _links: LINKS }, states: ['focus'] },
	{ tag: 'kol-spin', props: { _label: 'Lädt', _show: true, _variant: 'cycle' } },
	{ tag: 'kol-split-button', props: { _label: 'Bearbeiten', _on: CALLBACK, _items: ITEM_LIST }, interactive: true },
	{ tag: 'kol-table-stateful', props: { _label: 'Aufgaben', _headers: TABLE_HEADERS, _data: TABLE_DATA } },
	{ tag: 'kol-table-stateless', props: { _label: 'Aufgaben', _headers: TABLE_HEADERS, _data: TABLE_DATA } },
	{ tag: 'kol-tabs', props: { _label: 'Register', _tabs: TABS, _on: CALLBACK } },
	{ tag: 'kol-textarea', props: { _label: 'Nachricht' }, interactive: true },
	{ tag: 'kol-toolbar', props: { _label: 'Werkzeuge', _items: ITEM_LIST } },
	{
		tag: 'kol-tree',
		props: { _label: 'Sitemap' },
		html: '<kol-tree-item _label="Start"></kol-tree-item><kol-tree-item _label="Einstellungen"></kol-tree-item>',
	},
	{ tag: 'kol-tree-item', props: { _label: 'Knoten' }, content: 'Unterpunkt' },
	{ tag: 'kol-version', props: { _label: '4.5.0' } },
];

/**
 * Default render scenarios, one per component of the library plus selected
 * variants. Interactive states are real browser states (hover/focus through
 * Playwright on the interactive element in the shadow DOM).
 */
export const DEFAULT_SCENARIOS: Scenario[] = SEEDS.flatMap(expandSeed);

/**
 * Style variants in KoliBri switch only through `_variant`; besides it only `_disabled`
 * and the browser states change the look. A seed with `variants` therefore expands to
 * the matrix `_variant` × `_disabled`, each with its states.
 */
function expandSeed(seed: ScenarioSeed): Scenario[] {
	const base: Scenario = {
		id: seed.id ?? seed.tag,
		tag: seed.tag,
		props: seed.props ?? {},
		states: seed.states ?? (seed.interactive ? ['default', 'hover', 'focus', 'hover-focus'] : ['default']),
		...(seed.content !== undefined ? { content: seed.content } : {}),
		...(seed.html !== undefined ? { html: seed.html } : {}),
	};
	if (!seed.variants) {
		return [base];
	}
	return seed.variants.flatMap((variant) => {
		const enabled: Scenario = {
			...base,
			id: `${base.id}.${variant}`,
			props: { ...base.props, _variant: variant },
			axes: seed.disableable
				? [
						['Variant', variant],
						['Disabled', 'false'],
					]
				: [['Variant', variant]],
		};
		if (!seed.disableable) {
			return [enabled];
		}
		const disabled: Scenario = {
			...enabled,
			id: `${enabled.id}.disabled`,
			props: { ...enabled.props, _disabled: true },
			axes: [
				['Variant', variant],
				['Disabled', 'true'],
			],
		};
		return [enabled, disabled];
	});
}
