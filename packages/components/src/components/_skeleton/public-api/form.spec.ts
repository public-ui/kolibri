import type { PublicApiContract } from './contract';
import { describePublicApiContract } from './contract';

/**
 * Pinned public API of `kol-form` — same props, types and defaults as the predecessor
 * `shadow.tsx` on the develop branch (3 props + focusErrorList). The one deviation is the `_on`
 * JSDoc, which the predecessor carried in German; it was translated on reviewer request, which
 * changes only the generated documentation, not the API surface.
 */
const KOL_FORM_PUBLIC_API: PublicApiContract = {
	focusErrorList: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Scrolls to the error list and focuses the first link.',
	},
	_errorList: {
		kind: 'prop',
		type: 'ErrorListPropType[]',
		required: false,
		doc: 'A list of error objects that each describe an issue encountered in the form. Each error object contains a message and a selector for identifying the form element related to the error.',
	},
	_on: {
		kind: 'prop',
		type: 'KoliBriFormCallbacks',
		required: false,
		doc: 'Defines the callback functions for form events.',
	},
	_requiredText: {
		kind: 'prop',
		type: 'Stringified<boolean>',
		required: false,
		default: 'true',
		doc: 'Defines whether the mandatory-fields-hint should be shown. A string overrides the default text.',
	},
};

describePublicApiContract({ tag: 'kol-form', component: 'form', pinnedApi: KOL_FORM_PUBLIC_API, schemaInterface: 'FormProps' });
