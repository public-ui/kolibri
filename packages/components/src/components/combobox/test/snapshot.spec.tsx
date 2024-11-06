import { KolComboboxTag } from '@component-names';
import type { ComboboxProps } from '@schema';
import { executeSnapshotTests } from '@testing';

import { KolCombobox } from '../shadow';

const baseObj: ComboboxProps = { _label: 'Label', _suggestions: ['Frau', 'Herr', 'Divers'] };

executeSnapshotTests<ComboboxProps>(
	KolComboboxTag,
	[KolCombobox],
	[
		{ ...baseObj },
		{ ...baseObj, _hideError: false },
		{ ...baseObj, _hideError: true },
		{
			...baseObj,
			_icons: {
				left: {
					icon: 'codicon codicon-arrow-left',
				},
				right: {
					icon: 'codicon codicon-arrow-right',
				},
			},
		},
		{ ...baseObj, _required: false },
		{ ...baseObj, _required: true },
		{ ...baseObj, _touched: false },
		{ ...baseObj, _touched: true },
		{ ...baseObj, _disabled: true },
	],
);
