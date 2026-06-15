import { KolSelectTag } from '../../../core/component-names';
import type { SelectProps } from '../../../schema';
import { executeInputSnapshotTests } from '../../../utils/testing';

import { KolSelect } from '../shadow';

const options = [
	{
		label: 'Frau',
		value: 'Frau',
		disabled: true,
	},
	{
		label: 'Herr',
		value: 'Herr',
	},
	{
		label: 'Divers',
		value: 'Divers',
	},
];

executeInputSnapshotTests<SelectProps>(KolSelectTag, [KolSelect], {
	_options: options,
});

executeInputSnapshotTests<SelectProps>(KolSelectTag, [KolSelect], {
	_options: options,
	_multiple: true,
});

executeInputSnapshotTests<SelectProps>(KolSelectTag, [KolSelect], {
	_options: options,
	_value: 'Herr',
});

executeInputSnapshotTests<SelectProps>(KolSelectTag, [KolSelect], {
	_options: options,
	_multiple: true,
	_value: ['Divers', 'Frau'],
});

executeInputSnapshotTests<SelectProps>(KolSelectTag, [KolSelect], {
	_options: options,
	_hideMsg: true,
	_msg: { _type: 'error', _description: 'This is a combined error message' },
});

// Regression test for #10328: _rows must not activate listbox appearance without _multiple
executeInputSnapshotTests<SelectProps>(KolSelectTag, [KolSelect], {
	_options: options,
	_rows: 3,
});

executeInputSnapshotTests<SelectProps>(KolSelectTag, [KolSelect], {
	_options: options,
	_rows: 3,
	_multiple: true,
});
