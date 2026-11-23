import type { PublicApiContract } from './contract';
import { describePublicApiContract } from './contract';

/**
 * Pinned public API of `kol-form` (3 props plus `focusErrorList()`).
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
		doc: 'Defines whether the mandatory-fields-hint should be shown. A string overrides the default text.',
		default: 'true',
	},
};

describePublicApiContract({ tag: 'kol-form', component: 'form', pinnedApi: KOL_FORM_PUBLIC_API, schemaInterface: 'FormProps' });
