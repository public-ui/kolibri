import { KolInputColorTag } from '../../../../internals/src/core/component-names';
import type { InputColorProps } from '../../../../internals/src/schema/index';
import { executeInputSnapshotTests } from '../../../utils/testing';

import { KolInputColor } from '../component';

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
