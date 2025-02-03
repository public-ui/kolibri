import { KolInputColorTag } from '../../../core/component-names';
import type { InputColorProps } from '../../../schema';
import { executeInputSnapshotTests } from '../../../utils/testing';

import { KolInputColor } from '../shadow';

executeInputSnapshotTests<InputColorProps>(
	KolInputColorTag,
	[KolInputColor],
	{
		_value: '#FFF',
	},
	{ hasSmartButton: true },
);

executeInputSnapshotTests<InputColorProps>(
	KolInputColorTag,
	[KolInputColor],
	{
		_value: '#FFF',
		_suggestions: ['#F00', '#0F0', '#00F'],
	},
	{ hasSmartButton: true },
);
