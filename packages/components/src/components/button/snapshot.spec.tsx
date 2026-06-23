import { KolButtonTag } from '../../core/component-names';
import type { InternalButtonProps } from '../../schema';
import { executeSnapshotTests } from '../../utils/testing';

import { KolButton } from './component';

executeSnapshotTests<InternalButtonProps>(
	KolButtonTag,
	[KolButton],
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

		{ _label: 'Label', _accessKey: 'a' },
		{ _label: 'Label', _shortKey: 'Ctrl+S' },

		{ _label: 'Label', _inline: true },
		{ _label: 'Label', _inline: false },

		{ _label: 'Label', _hideLabel: true },
		{ _label: 'Label', _hideLabel: false },

		{ _label: 'Label', _icons: 'codicon codicon-home' },

		{ _label: 'Label', _variant: 'custom', _customClass: 'my-custom-class' } as InternalButtonProps,

		{ _label: 'Label', _type: 'submit' },
		{ _label: 'Label', _type: 'reset' },
		{ _label: 'Label', _type: 'button' },
	],
);
