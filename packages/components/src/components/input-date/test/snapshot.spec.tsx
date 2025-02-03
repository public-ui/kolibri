import { KolInputDateTag } from '../../../core/component-names';
import type { InputDateProps } from '../../../schema';
import { executeInputSnapshotTests } from '../../../utils/testing';

import { KolInputDate } from '../shadow';

executeInputSnapshotTests<InputDateProps>(KolInputDateTag, [KolInputDate], {
	_value: '2025-01-01',
	// _suggestions: [ ]
});
