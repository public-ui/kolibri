import { Generic } from "@a11y-ui/core";
import { KoliBriPrefix } from "../../schema";
import { KeyEnum } from "../../schema/i18n-keys";

export default {
	'kol-error': 'Error',
	'kol-warning': 'Warning',
	'kol-info': 'Note',
	'kol-success': 'Success',
	'kol-message': 'Message',
	'kol-close': 'Close',
	'kol-form-description': 'Form fields marked with an asterisk (*) are mandatory.',
	'kol-of': 'of',
	'kol-characters': 'characters',
	'kol-new': 'New',
	'kol-no-entries': 'No entries available.',
	'kol-change-order': 'Change order of {{colLabel}}',
	'kol-action-running': 'Action is running...',
	'kol-action-done': 'Action done',
	'kol-page-first': 'Directly to the first page',
	'kol-page-back': 'One page back',
	'kol-page-next': 'One page further',
	'kol-page-last': 'Directly to the last page',
	'kol-entries-per-site': 'Entries per page',
	'kol-page-current': 'Page {{page}}',
	'kol-page-selected': 'Page {{page}} is selected',
	'kol-page-per-site': '{{entries}} entries per page',
	'kol-nav-maximize': 'Maximize',
	'kol-nav-minimize': 'Minimize',
	'kol-logo-description': 'Logo {{orgShort}}. Federal eagle with flag staff and lettering {{orgLong}}',
	'kol-open-link-in-tab': 'The link will open in a new tab.',
	'kol-kolibri-logo': 'KoliBri logo',
}satisfies Generic.I18n.Map<KoliBriPrefix, keyof typeof KeyEnum>;
