import { KolInputCheckboxTag } from '../../core/component-names';
import { executeInputSnapshotTests, executeSnapshotTests } from '../../utils/testing';

import { KolInputCheckbox } from './component';

executeInputSnapshotTests(KolInputCheckboxTag, [KolInputCheckbox], {
	_checked: false,
	_labelAlign: 'left',
});

executeInputSnapshotTests(KolInputCheckboxTag, [KolInputCheckbox], {
	_checked: true,
	_labelAlign: 'left',
});

executeInputSnapshotTests(KolInputCheckboxTag, [KolInputCheckbox], {
	_checked: true,
	_labelAlign: 'right',
});

executeInputSnapshotTests(KolInputCheckboxTag, [KolInputCheckbox], {
	_checked: false,
	_variant: 'switch',
});

executeInputSnapshotTests(KolInputCheckboxTag, [KolInputCheckbox], {
	_checked: true,
	_variant: 'switch',
});

executeInputSnapshotTests(KolInputCheckboxTag, [KolInputCheckbox], {
	_checked: false,
	_variant: 'button',
});

executeInputSnapshotTests(KolInputCheckboxTag, [KolInputCheckbox], {
	_checked: true,
	_variant: 'button',
});

executeInputSnapshotTests(KolInputCheckboxTag, [KolInputCheckbox], {
	_indeterminate: true,
});

executeSnapshotTests(
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
