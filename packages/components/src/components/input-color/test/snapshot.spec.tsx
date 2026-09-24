import { KolInputColorTag } from '../../../core/component-names';
import type { InputColorProps } from '../../../schema';
import { executeInputSnapshotTests } from '../../../utils/testing';

import { KolInputColor } from '../shadow';

executeInputSnapshotTests<InputColorProps>(
	KolInputColorTag,
	[KolInputColor],
	{
		_value: '#FFFFFF',
	},
	{ hasSmartButton: true },
);

executeInputSnapshotTests<InputColorProps>(
	KolInputColorTag,
	[KolInputColor],
	{
		_value: '#FFFFFF',
		_suggestions: ['#FF0000', '#00FF00', '#0000FF'],
	},
	{ hasSmartButton: true },
);
