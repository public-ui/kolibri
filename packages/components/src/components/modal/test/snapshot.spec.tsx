import { KolModalTag } from '../../../core/component-names';
import type { ModalProps } from '../../../schema';
import { executeSnapshotTests } from '../../../utils/testing';

import { KolModal } from '../shadow';

executeSnapshotTests<ModalProps>(
	KolModalTag,
	[KolModal],
	[
		{
			_label: 'Blank Modal',
			_variant: 'blank',
			_width: '80%',
		},
		{
			_label: 'Modal as Card',
			_variant: 'card',
			_width: '80%',
		},
	],
);
