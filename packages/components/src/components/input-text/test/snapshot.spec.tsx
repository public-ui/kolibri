import { KolInputTextTag } from '../../../core/component-names';
import type { InputTextProps } from '../../../schema';
import { executeInputSnapshotTests } from '../../../utils/testing';

import { KolInputText } from '../shadow';

executeInputSnapshotTests<InputTextProps>(
	KolInputTextTag,
	[KolInputText],
	{
		_spellCheck: true,
		_value: 'Value',
	},
	{ hasSmartButton: true },
);
