import { KolSplitButtonTag } from '../../../core/component-names';
import type { SplitButtonProps } from '../../../schema';
import { executeSnapshotTests } from '../../../utils/testing';

import { KolSplitButton } from '../shadow';

executeSnapshotTests<SplitButtonProps>(
	KolSplitButtonTag,
	[KolSplitButton],
	[
		{ _label: 'Label' },
		{ _label: 'Label', _hideLabel: true },
		{ _label: 'Label', _disabled: true },
		{ _label: 'Label', _name: 'Name' },
		{ _label: 'Label', _icons: 'codicon codicon-git-pull-request' },

		...['primary', 'secondary', 'normal', 'danger', 'ghost'].map(
			(_variant) =>
				({
					_label: 'Label',
					_variant,
				}) as SplitButtonProps,
		),
	],
);
