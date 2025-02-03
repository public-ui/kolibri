import { KolComboboxTag } from '../../../core/component-names';
import type { ComboboxProps } from '../../../schema';
import { executeInputSnapshotTests } from '../../../utils/testing';

import { KolCombobox } from '../shadow';

executeInputSnapshotTests<ComboboxProps>(KolComboboxTag, [KolCombobox], {
	_value: 'Herr',
	_suggestions: ['Frau', 'Herr', 'Divers'],
});
