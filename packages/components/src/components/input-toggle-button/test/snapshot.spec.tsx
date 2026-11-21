import { KolInputToggleButtonTag } from '../../../core/component-names';
import type { InputToggleButtonProps } from '../../../schema';
import { executeInputSnapshotTests, executeSnapshotTests } from '../../../utils/testing';

import { KolInputToggleButton } from '../component';

executeInputSnapshotTests<InputToggleButtonProps>(KolInputToggleButtonTag, [KolInputToggleButton], {
	_checked: false,
});

executeInputSnapshotTests<InputToggleButtonProps>(KolInputToggleButtonTag, [KolInputToggleButton], {
	_checked: true,
});

executeInputSnapshotTests<InputToggleButtonProps>(KolInputToggleButtonTag, [KolInputToggleButton], {
	_checked: true,
	_labelAlign: 'left',
});

executeSnapshotTests<InputToggleButtonProps>(
	KolInputToggleButtonTag,
	[KolInputToggleButton],
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
