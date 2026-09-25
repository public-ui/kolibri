import type { PublicApiContract } from './contract';
import { describePublicApiContract, extractFrom, findUndocumentedMembers } from './contract';

/**
 * Pinned public API of `kol-dialog`: 5 props plus the five open/close methods — identical to the
 * predecessor `shadow.tsx` on the develop branch.
 */
const KOL_DIALOG_PUBLIC_API: PublicApiContract = {
	openModal: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Opens the dialog. @deprecated Use showModal() instead.',
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
		doc: 'Closes the dialog.',
	},
	closeModal: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Closes the dialog. @deprecated Use close() instead.',
	},
	_label: {
		kind: 'prop',
		type: 'LabelPropType',
		required: true,
		doc: 'Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).',
	},
	_level: {
		kind: 'prop',
		type: 'HeadingLevel',
		required: false,
		default: '0',
		doc: 'Defines which H-level from 1-6 the heading has. 0 specifies no heading and is shown as bold text.',
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

describePublicApiContract({ tag: 'kol-dialog', component: 'dialog', pinnedApi: KOL_DIALOG_PUBLIC_API, schemaInterface: 'DialogProps' });

describe('kol-dialog-wc transitional wrapper (internal contract for legacy consumers)', () => {
	it('keeps the full predecessor surface: 5 props plus the five open/close methods', () => {
		const extracted = extractFrom('dialog', 'wc.tsx');
		expect(extracted.filter((member) => member.kind === 'prop').map((member) => member.name)).toEqual(['_label', '_level', '_on', '_variant', '_width']);
		expect(extracted.filter((member) => member.kind === 'method').map((member) => member.name)).toEqual([
			'show',
			'showModal',
			'openModal',
			'close',
			'closeModal',
		]);
	});

	it('documents every public member (custom-elements.json and docs-vscode are generated from prop.docs)', () => {
		expect(findUndocumentedMembers('dialog', 'wc.tsx')).toEqual([]);
	});
});
