import { Generic } from "@a11y-ui/core";
import { KoliBriPrefix } from "../schema";
import { KeyEnum } from "../schema/i18n-keys";

export default {
	'kol-error': 'Fehler',
	'kol-warning': 'Warnung',
	'kol-info': 'Hinweis',
	'kol-success': 'Erfolg',
	'kol-message': 'Nachricht',
	'kol-close': 'Schließen',
	'kol-form-description': 'Formular-Felder, die mit einem Sternchen (*) gekennzeichnet sind, sind Pflichtangaben.',
	'kol-of': 'von',
	'kol-characters': 'Zeichen',
	'kol-new': 'Neu',
	'kol-no-entries': 'Es sind keine Einträge vorhanden.',
	'kol-change-order': 'Sortierung von {{colLabel}} ändern',
	'kol-action-running': 'Aktion wird ausgeführt...',
	'kol-action-done': 'Aktion abgeschlossen',
	'kol-page-first': 'Direkt zur ersten Seite',
	'kol-page-back': 'Eine Seite zurück',
	'kol-page-next': 'Eine Seite weiter',
	'kol-page-last': 'Direkt zur letzten Seite',
	'kol-entries-per-site': 'Einträge pro Seite',
	'kol-page-current': 'Seite {{page}}',
	'kol-page-selected': 'Seite {{page}} ist ausgewählt',
	'kol-page-per-site': '{{entries}} Einträge pro Seite',
	'kol-nav-maximize': 'Navigation maximieren',
	'kol-nav-minimize': 'Navigation minimieren',
	'kol-logo-description': 'Logo {{orgShort}}. Bundesadler mit Flaggenstab und Schriftzug {{orgLong}}',
	'kol-open-link-in-tab': 'Der Link wird in einem neuen Tab geöffnet.',
	'kol-kolibri-logo': 'Logo von KoliBri',
} satisfies Generic.I18n.Map<KoliBriPrefix, keyof typeof KeyEnum>;
