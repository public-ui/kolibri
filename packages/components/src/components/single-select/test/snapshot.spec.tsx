import { KolSingleSelectTag } from '../../../../internals/src/core/component-names';
import type { SingleSelectProps } from '../../../../internals/src/schema/index';
import { executeInputSnapshotTests } from '../../../utils/testing';

import { KolSingleSelect } from '../component';

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

executeInputSnapshotTests<SingleSelectProps>(KolSingleSelectTag, [KolSingleSelect], {
	_options: options,
});
