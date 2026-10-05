import { KolDialogTag, KolDialogWcTag, KolModalTag } from '../../../core/component-names';
import type { DialogProps, ModalProps } from '../../../schema';
import { executeSnapshotTests } from '../../../utils/testing';

import { KolModal } from '../../modal/component';
import { KolDialog } from '../component';
import { KolDialogWc } from '../wc';

const cases: DialogProps[] = [
	{
		_label: 'Blank Dialog',
		_variant: 'blank',
		_width: '80%',
	},
	{
		_label: 'Dialog as Card',
		_variant: 'card',
		_width: '80%',
	},
];

executeSnapshotTests<DialogProps>(KolDialogTag, [KolDialog], cases);
executeSnapshotTests<ModalProps>(KolModalTag, [KolModal], cases);

/**
 * The transitional `kol-dialog-wc` renders the same `DialogFC` into the light DOM, where
 * `kol-table-stateless` styles it from its own stylesheet.
 */
executeSnapshotTests<DialogProps>(KolDialogWcTag, [KolDialogWc], cases);
