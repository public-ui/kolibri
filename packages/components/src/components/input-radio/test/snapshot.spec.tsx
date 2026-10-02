import { KolInputRadioTag } from '../../../core/component-names';
import type { InputRadioProps } from '../../../schema';
import { executeInputSnapshotTests, executeSnapshotTests } from '../../../utils/testing';

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

const objectValue = { id: 1 };

executeSnapshotTests<InputRadioProps>(
	KolInputRadioTag,
	[KolInputRadio],
	[
		{ _label: 'Label', _name: 'field', _options: options, _value: 'Herr' },
		{ _label: 'Label', _options: options, _value: 'Herr' },
		{ _disabled: true, _label: 'Label', _name: 'field', _options: options, _value: 'Herr' },
		{ _label: 'Label', _name: 'field', _options: options, _required: true },
		{ _hideLabel: true, _label: 'Label', _name: 'field', _options: options, _value: 'Divers' },
		{
			_label: 'Label',
			_name: 'field',
			_options: [
				{ hint: 'Hinweis A', label: 'A', value: 'a' },
				{ label: 'B', value: 'b' },
			],
			_value: 'a',
		},
		{
			_label: 'Label',
			_name: 'field',
			_options: [
				{ label: 'Objekt', value: objectValue },
				{ label: 'Zahl', value: 1 },
			],
			_value: objectValue,
		},
		// An option with a non-string label makes the whole list invalid: nothing is rendered.
		{ _label: 'Label', _name: 'field', _options: [{ label: 1 as unknown as string, value: 1 }] },
	],
);
