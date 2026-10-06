import { KolDialogTag, KolModalTag } from '../../../core/component-names';
import type { DialogProps, ModalProps } from '../../../schema';
import { executeSnapshotTests } from '../../../utils/testing';

import { KolModal } from '../../modal/component';
import { KolDialog } from '../component';

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
