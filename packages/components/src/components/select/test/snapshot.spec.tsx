import { KolSelectTag } from '../../../core/component-names';
import type { SelectProps } from '../../../schema';
import { executeInputSnapshotTests } from '../../../utils/testing';

import { KolSelect } from '../component';

const COMPONENTS = [KolSelect];

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

executeInputSnapshotTests<SelectProps>(KolSelectTag, COMPONENTS, {
	_options: options,
});

executeInputSnapshotTests<SelectProps>(KolSelectTag, COMPONENTS, {
	_options: options,
	_multiple: true,
});

executeInputSnapshotTests<SelectProps>(KolSelectTag, COMPONENTS, {
	_options: options,
	_value: 'Herr',
});

executeInputSnapshotTests<SelectProps>(KolSelectTag, COMPONENTS, {
	_options: options,
	_multiple: true,
	_value: ['Divers', 'Frau'],
});

executeInputSnapshotTests<SelectProps>(KolSelectTag, COMPONENTS, {
	_options: options,
	_hideMsg: true,
	_msg: { _type: 'error', _description: 'This is a combined error message' },
});

// Regression test for #10328: _rows must not activate listbox appearance without _multiple
executeInputSnapshotTests<SelectProps>(KolSelectTag, COMPONENTS, {
	_options: options,
	_rows: 3,
});

executeInputSnapshotTests<SelectProps>(KolSelectTag, COMPONENTS, {
	_options: options,
	_rows: 3,
	_multiple: true,
});

const optionsWithOptgroup = [
	{ label: 'Keine Angabe', value: '' },
	{
		label: 'Gruppe',
		options: [
			{ label: 'Eins', value: 1 },
			{ label: 'Zwei', value: 2, disabled: true },
		],
	},
	{ label: 'Drei', value: 3 },
];

executeInputSnapshotTests<SelectProps>(KolSelectTag, COMPONENTS, {
	_options: optionsWithOptgroup,
	_value: 2,
});

// A value outside the options is kept, so no option is selected; only a missing value preselects the first option.
executeInputSnapshotTests<SelectProps>(KolSelectTag, COMPONENTS, {
	_options: options,
	_value: 'Unbekannt',
});

// An optgroup as first option has no value of its own, so no option is preselected.
executeInputSnapshotTests<SelectProps>(KolSelectTag, COMPONENTS, {
	_options: [optionsWithOptgroup[1], optionsWithOptgroup[2]],
});

executeInputSnapshotTests<SelectProps>(KolSelectTag, COMPONENTS, {
	_options: options,
	_tabIndex: -1,
	_name: 'field',
	_required: true,
});
