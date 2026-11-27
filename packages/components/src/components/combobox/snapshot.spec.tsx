import { KolComboboxTag } from '../../core/component-names';
import { executeInputSnapshotTests } from '../../utils/testing';
import { KolCombobox } from './component';

executeInputSnapshotTests(KolComboboxTag, [KolCombobox], {
	_value: 'Herr',
	_suggestions: ['Frau', 'Herr', 'Divers'],
});
