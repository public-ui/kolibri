import { KolComboboxTag } from '../../../../internals/src/core/component-names';
import type { ComboboxProps } from '../../../../internals/src/schema/index';
import { executeInputSnapshotTests } from '../../../utils/testing';

import { KolCombobox } from '../component';

executeInputSnapshotTests<ComboboxProps>(KolComboboxTag, [KolCombobox], {
	_value: 'Herr',
	_suggestions: ['Frau', 'Herr', 'Divers'],
});
