import { KolTextareaTag } from '../../../core/component-names';
import type { TextareaProps } from '../../../schema';
import { executeInputSnapshotTests } from '../../../utils/testing';

import { KolTextarea } from '../shadow';

executeInputSnapshotTests<TextareaProps>(KolTextareaTag, [KolTextarea], {
	_rows: 5,
	_spellCheck: true,
	_value: 'Value',
});
