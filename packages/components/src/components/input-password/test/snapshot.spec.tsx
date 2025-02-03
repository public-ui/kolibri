import { KolInputPasswordTag } from '../../../core/component-names';
import type { InputPasswordProps } from '../../../schema';
import { executeInputSnapshotTests } from '../../../utils/testing';

import { KolInputPassword } from '../shadow';

executeInputSnapshotTests<InputPasswordProps>(
	KolInputPasswordTag,
	[KolInputPassword],
	{
		_value: 'Value',
	},
	{ hasSmartButton: true },
);
