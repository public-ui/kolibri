import { KolInputTextTag } from '../../../core/component-names';
import type { InputTextProps } from '../../../schema';
import { executeInputSnapshotTests } from '../../../utils/testing';

import { KolPopoverButtonWc } from '../../popover-button/component';
import { KolInputText } from '../shadow';

executeInputSnapshotTests<InputTextProps>(
	KolInputTextTag,
	[KolInputText, KolPopoverButtonWc],
	{
		_spellCheck: true,
		_value: 'Value',
	},
	{ hasSmartButton: true },
);
