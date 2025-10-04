import { KolMultiSelectTag } from '../../../core/component-names';
import type { MultiSelectProps } from '../../../schema';
import { executeInputSnapshotTests } from '../../../utils/testing';

import { KolMultiSelect } from '../shadow';

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

executeInputSnapshotTests<MultiSelectProps>(KolMultiSelectTag, [KolMultiSelect], {
	_options: options,
});
