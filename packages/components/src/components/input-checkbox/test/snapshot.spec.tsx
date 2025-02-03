import { KolInputCheckboxTag } from '../../../core/component-names';
import type { InputCheckboxProps } from '../../../schema';
import { executeInputSnapshotTests } from '../../../utils/testing';

import { KolInputCheckbox } from '../shadow';

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
