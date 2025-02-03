import { KolInputRadioTag } from '../../../core/component-names';
import type { InputRadioProps } from '../../../schema';
import { executeInputSnapshotTests } from '../../../utils/testing';

import { KolInputRadio } from '../shadow';

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

executeInputSnapshotTests<InputRadioProps>(KolInputRadioTag, [KolInputRadio], {
	_value: 'Value',
	_options: options,
});

executeInputSnapshotTests<InputRadioProps>(KolInputRadioTag, [KolInputRadio], {
	_value: 'Value',
	_options: options,
	_orientation: 'horizontal',
});
