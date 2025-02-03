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
