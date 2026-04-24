import { KolButtonTag } from '../../../core/component-names';
import type { InternalButtonProps } from '../../../schema';
import { executeSnapshotTests } from '../../../utils/testing';

import { KolButtonWc } from '../component';
import { KolButton } from '../shadow';

executeSnapshotTests<InternalButtonProps>(
	KolButtonTag,
	[KolButton, KolButtonWc],
	[
		{ _label: 'Label' },

		{ _label: 'Label', _disabled: false },
		{ _label: 'Label', _disabled: true },

		...['primary', 'secondary', 'normal', 'danger', 'ghost'].map((_variant) => ({
			_label: 'Label',
			_variant,
		})),

		{ _label: 'Label', _value: 'Hello' },

		{ _label: 'Label', _ariaDescription: 'Aria Description' },
	],
);
