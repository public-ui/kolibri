import { KolInputColorTag } from '../../core/component-names';
import { executeInputSnapshotTests } from '../../utils/testing';

import { KolInputColor } from './component';

executeInputSnapshotTests(
	KolInputColorTag,
	[KolInputColor],
	{
		_value: '#FFFFFF',
	},
	{ hasSmartButton: true },
);

executeInputSnapshotTests(
	KolInputColorTag,
	[KolInputColor],
	{
		_value: '#FFFFFF',
		_suggestions: ['#FF0000', '#00FF00', '#0000FF'],
	},
	{ hasSmartButton: true },
);
