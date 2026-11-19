import { KolInputCheckboxTag } from '../../../core/component-names';
import type { InputCheckboxProps } from '../../../schema';
import { executeInputSnapshotTests, executeSnapshotTests } from '../../../utils/testing';

import { KolInputCheckbox } from '../component';

executeInputSnapshotTests<InputCheckboxProps>(KolInputCheckboxTag, [KolInputCheckbox], {
	_checked: false,
	_labelAlign: 'left',
});

executeInputSnapshotTests<InputCheckboxProps>(KolInputCheckboxTag, [KolInputCheckbox], {
	_checked: true,
	_labelAlign: 'left',
});

executeInputSnapshotTests<InputCheckboxProps>(KolInputCheckboxTag, [KolInputCheckbox], {
	_checked: true,
	_labelAlign: 'right',
});

executeInputSnapshotTests<InputCheckboxProps>(KolInputCheckboxTag, [KolInputCheckbox], {
	_checked: false,
	_variant: 'switch',
});

executeInputSnapshotTests<InputCheckboxProps>(KolInputCheckboxTag, [KolInputCheckbox], {
	_checked: true,
	_variant: 'switch',
});

executeInputSnapshotTests<InputCheckboxProps>(KolInputCheckboxTag, [KolInputCheckbox], {
	_checked: false,
	_variant: 'button',
});

executeInputSnapshotTests<InputCheckboxProps>(KolInputCheckboxTag, [KolInputCheckbox], {
	_checked: true,
	_variant: 'button',
});

executeInputSnapshotTests<InputCheckboxProps>(KolInputCheckboxTag, [KolInputCheckbox], {
	_indeterminate: true,
});

executeSnapshotTests<InputCheckboxProps>(
	KolInputCheckboxTag,
	[KolInputCheckbox],
	[
		{ _label: 'Label' },
		{ _label: 'Label', _name: 'field', _required: true },
		{ _checked: true, _label: 'Label', _name: 'field', _value: 'yes' },
		{ _checked: true, _label: 'Label', _name: 'field', _value: { id: 1 } },
		{ _checked: true, _icons: { checked: 'codicon codicon-check' }, _label: 'Label', _name: 'field' },
		{ _hideLabel: true, _label: 'Label', _labelAlign: 'left', _name: 'field' },
		{ _indeterminate: true, _label: 'Label', _name: 'field', _variant: 'switch' },
	],
);
