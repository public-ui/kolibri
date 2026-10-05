import type { PublicApiContract } from './contract';
import { describePublicApiContract } from './contract';

/**
 * Pinned public API of the deprecated `kol-modal`: the same surface as `kol-dialog` minus
 * `_level`, which it never exposed, and with its own "modal dialog" wording.
 */
const KOL_MODAL_PUBLIC_API: PublicApiContract = {
	openModal: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Opens the modal dialog. @deprecated Use showModal() instead.',
	},
	showModal: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Opens the dialog as a modal.',
	},
	show: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Opens the dialog. Pass true to open as a modal dialog.',
	},
	close: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Closes the modal dialog.',
	},
	closeModal: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Closes the modal dialog. @deprecated Use close() instead.',
	},
	_label: {
		kind: 'prop',
		type: 'LabelPropType',
		required: true,
		doc: 'Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).',
	},
	_on: {
		kind: 'prop',
		type: 'KoliBriDialogEventCallbacks',
		required: false,
		doc: 'Defines the modal callback functions.',
	},
	_variant: {
		kind: 'prop',
		type: 'ModalVariantPropType',
		required: false,
		default: "'blank'",
		doc: 'Defines the variant of the modal.',
	},
	_width: {
		kind: 'prop',
		type: 'string',
		required: false,
		default: "'100%'",
		doc: 'Defines the width of the modal. (max-width: 100%)',
	},
};

describePublicApiContract({ tag: 'kol-modal', component: 'modal', pinnedApi: KOL_MODAL_PUBLIC_API, schemaInterface: 'DialogProps' });
