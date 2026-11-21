import { KolInputSwitchTag } from '../../../core/component-names';
import type { InputSwitchProps } from '../../../schema';
import { executeInputSnapshotTests, executeSnapshotTests } from '../../../utils/testing';

import { KolInputSwitch } from '../component';

executeInputSnapshotTests<InputSwitchProps>(KolInputSwitchTag, [KolInputSwitch], {
	_checked: false,
});

executeInputSnapshotTests<InputSwitchProps>(KolInputSwitchTag, [KolInputSwitch], {
	_checked: true,
});

executeInputSnapshotTests<InputSwitchProps>(KolInputSwitchTag, [KolInputSwitch], {
	_checked: true,
	_labelAlign: 'left',
});

executeSnapshotTests<InputSwitchProps>(
	KolInputSwitchTag,
	[KolInputSwitch],
	[
		{ _label: 'Label' },
		{ _label: 'Label', _name: 'field', _required: true },
		{ _checked: true, _label: 'Label', _name: 'field', _value: 'yes' },
		{ _checked: true, _label: 'Label', _name: 'field', _value: { id: 1 } },
		{ _checked: true, _icons: { checked: 'codicon codicon-check' }, _label: 'Label', _name: 'field' },
		{ _checked: true, _disabled: true, _label: 'Label', _name: 'field' },
		{ _hideLabel: true, _label: 'Label', _labelAlign: 'left', _name: 'field' },
	],
);
