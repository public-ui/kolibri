import { KolInputNumberTag } from '../../../core/component-names';
import type { InputNumberProps } from '../../../schema';
import { executeInputSnapshotTests } from '../../../utils/testing';

import { KolInputNumber } from '../shadow';

executeInputSnapshotTests<InputNumberProps>(
	KolInputNumberTag,
	[KolInputNumber],
	{
		// _value: 'Value'
	},
	{ hasSmartButton: true },
);

executeInputSnapshotTests<InputNumberProps>(
	KolInputNumberTag,
	[KolInputNumber],
	{
		// _value: 'Value'
		_suggestions: [1, 2, 3],
	},
	{ hasSmartButton: true },
);
