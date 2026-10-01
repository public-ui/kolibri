import { KolInputDateTag } from '../../../core/component-names';
import type { InputDateProps } from '../../../schema';
import { executeInputSnapshotTests, executeSnapshotTests } from '../../../utils/testing';

import { KolInputDate } from '../shadow';

executeInputSnapshotTests<InputDateProps>(KolInputDateTag, [KolInputDate], {
	_value: '2025-01-01',
	// _suggestions: [ ]
});

executeSnapshotTests<InputDateProps>(
	KolInputDateTag,
	[KolInputDate],
	[
		{ _label: 'Label', _name: 'field', _type: 'date', _value: '2025-01-02' },
		{ _label: 'Label', _name: 'field', _type: 'datetime-local', _value: '2025-01-02T03:04' },
		{ _label: 'Label', _name: 'field', _type: 'month', _value: '2025-01' },
		{ _label: 'Label', _name: 'field', _type: 'time', _value: '03:04' },
		{ _label: 'Label', _name: 'field', _step: 1, _type: 'time', _value: '03:04:05' },
		{ _label: 'Label', _name: 'field', _type: 'week', _value: '2025-W01' },
		{ _label: 'Label', _max: '2025-12-31', _min: '2025-01-01', _name: 'field', _value: '2025-06-15' },
		{ _label: 'Label', _name: 'field', _type: 'date', _value: '03:04' },
		{ _label: 'Label', _name: 'field', _value: null },
		{ _label: 'Label', _name: 'field', _readOnly: true, _required: true, _value: '2025-01-02' },
	],
);
