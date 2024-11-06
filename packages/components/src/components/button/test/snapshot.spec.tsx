import { KolButtonTag } from '@component-names';
import type { ButtonProps } from '@schema';
import { executeSnapshotTests } from '@testing';

import { KolButton } from '../shadow';
import { KolButtonWc } from '../component';

executeSnapshotTests<ButtonProps>(
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
				}) as ButtonProps,
		),

		{ _label: 'Label', _value: 'Hello' },

		{ _label: 'Label', _ariaDescription: 'Aria Description' },
	],
);
