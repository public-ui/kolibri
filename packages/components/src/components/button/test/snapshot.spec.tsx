import { KolButtonTag } from '../../../core/component-names';
import type { InternalButtonProps } from '../../../schema';
import { executeSnapshotTests } from '../../../utils/testing';

import { KolButton } from '../component';
import { KolButtonWc } from '../wc';

executeSnapshotTests<InternalButtonProps>(
	KolButtonTag,
	[KolButton, KolButtonWc],
	[
		{ _label: 'Label' },

		{ _label: 'Label', _disabled: false },
		{ _label: 'Label', _disabled: true },

		...['primary', 'secondary', 'normal', 'danger', 'ghost'].map(
			(_variant) =>
				({
					_label: 'Label',
					_variant,
				}) as InternalButtonProps,
		),

		{ _label: 'Label', _value: 'Hello' },

		{ _label: 'Label', _ariaDescription: 'Aria Description' },
	],
);
