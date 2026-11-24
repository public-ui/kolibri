import { KolSingleSelectTag } from '../../core/component-names';
import { executeInputSnapshotTests } from '../../utils/testing';

import { KolSingleSelect } from './component';

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

executeInputSnapshotTests(KolSingleSelectTag, [KolSingleSelect], {
	_options: options,
});
